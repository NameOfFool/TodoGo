package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {
	app := fiber.New()

	todos := []Todo{}

	app.Get("/checkhealth", func(c fiber.Ctx) error {
		return c.SendString("OK")
	})

	app.Post("/api/todos", func(c fiber.Ctx) error {
		todo := &Todo{}
		if err := c.Bind().JSON(todo); err != nil {
			return err
		}
		log.Println("id", todo.ID)

		todo.ID = len(todos) + 1

		todos = append(todos, *todo)

		return c.JSON(todos)
	})

	log.Fatal(app.Listen(":8000"))
}
