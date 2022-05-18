const express = require("express");
const app = express();
app.use(express.json());
app.set("json spaces", 4);
const port = process.env.PORT || 3000;
// Require para usar Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CORS
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.get("/", (req, res) => {
    res.json({message: "alive"});
});
// METHOD GET (READ)
app.get("/explorers", async (req, res) => {
    const allExplorers =  await prisma.explorer.findMany({});
    res.json(allExplorers);
});

app.get("/explorers/:id", async (req, res) => {
    const id = req.params.id;
    const explorer = await prisma.explorer.findUnique({where: {id: parseInt(id)}});
    res.json(explorer);
});

// METHOD POST (CREATE)
app.post("/explorers", async (req, res) => {
    const explorer = {
        name: req.body.name,
        username: req.body.username,
        mission: req.body.mission
    };
    const message = "Explorer creado.";
    await prisma.explorer.create({data: explorer});
    return res.json({message});
});

// METHOD PUT (UPDATE)
app.put("/explorers/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.explorer.update({
        where: {
            id: id
        },
        data: {
            mission: req.body.mission
        }
    });

    return res.json({message: "Actualizado correctamente"});
});

// METHOD DELETE (DELETE)
app.delete("/explorers/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.explorer.delete({where: {id: id}});
    return res.json({message: "Eliminado correctamente"});
});

// ENDPOINTS TO MISSION SERVICE
app.get("/missions", async (req, res) => {
    const allMissions = await prisma.mission.findMany({});
    res.json(allMissions);
});

app.get("/missions/:id", async (req, res) => {
    const  id = req.params.id;
    const mission = await prisma.mission.findUnique({ where: {id: parseInt(id)}});
    res.json(mission);
});

app.post("/missions", async (req, res) => {
    const mission = {
        name: req.body.name,
        lang: req.body.lang,
        missionCommander: req.body.missionCommander,
        enrollments: req.body.enrollments
    };
    const message = "Misión agregada.";
    await prisma.mission.create({data: mission});
    return res.json({message});
});

app.put("/missions/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    await prisma.mission.update({
        where: {
            id: id
        },
        data: {
            missionCommander: req.body.missionCommander
        }
    });
    return res.json({message: "Actualizado correctamente"});
});

app.delete("/missions/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await prisma.mission.delete({where: {id:id}});
    return res.json({message: "Eliminado correctamente"});
});

app.listen(port, () => {
    console.log(`Listening to requests on port ${port}`);
});