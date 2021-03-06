const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

(async function main() {
    try {
        const woopa = await prisma.explorer.upsert({
            where: { name: "Woopa" },
            update: {},
            create: {
                name: "Woopa",
                username: "ajolonauta",
                mission: "Node"
            },
        });

        const woopa1 = await prisma.explorer.upsert({
            where: { name: "Woopa1" },
            update: {},
            create: {
                name: "Woopa1",
                username: "ajolonauta1",
                mission: "Node"
            },
        });

        const woopa2 = await prisma.explorer.upsert({
            where: { name: "Woopa 2" },
            update: {},
            create: {
                name: "Woopa 2",
                username: "ajolonauta2",
                mission: "Java"
            },
        });

        const woopa3 = await prisma.explorer.upsert({
            where: { name: "Woopa 3" },
            update: {},
            create: {
                name: "Woopa 3",
                username: "ajolonauta3",
                mission: "Node"
            },
        });
        
        const washi = await prisma.explorer.upsert({
            where: { name : "washi"},
            update: {},
            create: {
                name: "washi",
                username: "washiprah",
                mission: "Node"
            }
        });

        console.log("Create 4 explorers");

        const node = await prisma.mission.upsert({
            where : { name: "Node"},
            update: {},
            create: {
                name: "Node",
                lang: "javascript",
                missionCommander: "Carlo",
                enrollments: 20
            }
        });
        
        const java = await prisma.mission.upsert({
            where : { name: "Java"},
            update: {},
            create: {
                name: "Java",
                lang: "Java",
                missionCommander: "Fernanda",
                enrollments: 15
            }
        });
        
        const python = await prisma.mission.upsert({
            where : { name: "Python"},
            update: {},
            create: {
                name: "Python",
                lang: "Python",
                missionCommander: "Washi",
                enrollments: 10
            }
        });
        console.log("Se han credo 3 misiones");
    } catch(e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();