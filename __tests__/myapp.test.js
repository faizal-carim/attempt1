const request = require("supertest");
const app = require("../app");
const sequelize = require("../util/database");


beforeAll(async () => {
    await sequelize.sync();
});

describe("POST /register", () => {
    
    let bearer = "";
    let wrong_bearer = "wrong_bearer";
    let userId = 1;
    let email = "faizal"+Date.now()+"@gmail.com";

    test("It creates a new user", async () => {
      const newUser = await request(app)
        .post("/register")
        .send({
            name:"Usman",
            email:email,
            password:"usman",
            role:"ADMIN"
        });
      expect(newUser.statusCode).toBe(201);
    });

    test("It tries to create a new user that already exists", async () => {
        const newUser = await request(app)
          .post("/register")
          .send({
              name:"Usman",
              email:email,
              password:"usman",
              role:"ADMIN"
          });
        expect(newUser.statusCode).toBe(409);
    });

    test("It tries to create a new user without the required fields", async () => {
        const newUser = await request(app)
          .post("/register")
          .send({
              name:"Usman",
              email:email
          });
        expect(newUser.statusCode).toBe(400);
    });

    test("It tries to create a new user that is neither ADMIN nor STAFF", async () => {
        const newUser = await request(app)
          .post("/register")
          .send({
              name:"Usman",
              email:email,
              password:"usman",
              role:"USER"
          });
        expect(newUser.statusCode).toBe(409);
    });


    test("It logs in a user", async () => {
        const user = await request(app)
          .post("/login")
          .send({
              email:email,
              password:"usman"
          });
        bearer = user.body.token;
        userId = user.body.userId;
        expect(user.statusCode).toBe(200);
    });

    test("It tries to log in a user with invalid credentials", async () => {
        const user = await request(app)
          .post("/login")
          .send({
              email:email,
              password:"usman1"
          });
        expect(user.statusCode).toBe(400);
    });

    test("It creates a new schedule for the user", async () => {
        const user = await request(app)
          .post("/newSchedule")
          .set({ "Authorization": 'Bearer '+ bearer })
          .send({
            "userId":userId,
            "workDate":"2022-04-18",
            "shiftLength":16
          });
        expect(user.statusCode).toBe(201);
    });

    test("It tries to create a new schedule for the user that does not exist", async () => {
        const user = await request(app)
          .post("/newSchedule")
          .set({ "Authorization": 'Bearer '+ bearer })
          .send({
            "userId":0,
            "workDate":"2022-04-18",
            "shiftLength":16
          });
        expect(user.statusCode).toBe(400);
    });

    test("It updates a users name", async () => {
        const user = await request(app)
          .patch("/updateUser")
          .set({ "Authorization": 'Bearer '+ bearer })
          .send({
                "userId":userId,
                "name":"osman f"
          });
        expect(user.statusCode).toBe(200);
    });

    test("It updates a users name with invalid token", async () => {
        const user = await request(app)
          .patch("/updateUser")
          .set({ "Authorization": 'Bearer '+ wrong_bearer })
          .send({
                "userId":userId,
                "name":"osman f"
          });
        expect(user.statusCode).toBe(403);
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
            "userId":userId
           });
        expect(user.statusCode).toBe(200);
    });
    

  });