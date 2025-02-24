package main

import (
	"log"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
	}))

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

	app.Patch("/api/todos/:id/done", func(c fiber.Ctx) error {
		id := fiber.Params[int](c, "id")

		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = true
				break
			}
		}
		return c.JSON(todos)
	})

	app.Get("/api/todos", func(c fiber.Ctx) error {
		return c.JSON(todos)
	})

	log.Fatal(app.Listen(":8000"))
}
