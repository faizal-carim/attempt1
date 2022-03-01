const request = require("supertest");
const app = require("../app");
const sequelize = require("../util/database");


beforeAll(async () => {
    await sequelize.sync();
});

describe("POST /register", () => {
    
    let bearer = "";
    let userId = 1;
    let email = "faizal"+Date.now()+"@gmail.com";

    test("It create a new user", async () => {
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