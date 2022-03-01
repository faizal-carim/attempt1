// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../app");
const sequelize = require("../util/database");

beforeAll(async () => {
    
  });

describe("POST /register", () => {

    let bearer = "";
    let userId = 1;

    test("It create a new user", async () => {
      const newUser = await request(app)
        .post("/register")
        .send({
            name:"Usman",
            email:"usman@gmail.com",
            password:"usman",
            role:"ADMIN"
        });
      expect(newUser.statusCode).toBe(201);
    });

    test("It logs in a user", async () => {
        const user = await request(app)
          .post("/login")
          .send({
              email:"usman@gmail.com",
              password:"usman"
          });
        bearer = user.body.token;
        expect(user.statusCode).toBe(200);
    });

    test("It creates a new schedule for the user", async () => {
        const user = await request(app)
          .post("/newSchedule")
          .set({ "Authorization": 'Bearer '+ bearer })
          .send({
            "userId":3,
            "workDate":"2022-04-18",
            "shiftLength":16
          });
        expect(user.statusCode).toBe(201);
    });

    test("It updates a users name", async () => {
        const user = await request(app)
          .patch("/updateUser")
          .set({ "Authorization": 'Bearer '+ bearer })
          .send({
                "userId":3,
                "name":"osman f"
          });
        expect(user.statusCode).toBe(200);
    });

    test("It gets all the users schedules", async () => {
        const user = await request(app)
          .get("/getAllUsersSchedules")
          .set({ "Authorization": 'Bearer '+ bearer });
        expect(user.statusCode).toBe(200);
    });

    test("It removes a user and all related schedules", async () => {
        const user = await request(app)
          .delete("/removeUser")
          .set({ "Authorization": 'Bearer '+ bearer })
          .send({
            "userId":3
           });
        expect(user.statusCode).toBe(200);
    });

  });