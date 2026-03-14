import { PrismaClient,Role, PlanType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Staring database seeding...");

    // Create default admin user 
    const adminEmail = "admin@gmail.com";
    const adminPassword  = "udemy12345";

    // Check if admin already exists 
    const existingAdmin = await prisma.user.findUnique({
        where: { email: adminEmail},
    });

    if (existingAdmin) {
        console.log("Admin user already exists");
    } else {
        // Hash the password 
        const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create admin user 
    const admin = await prisma.user.create({
        data: {
            email: adminEmail,
            password: hashedPassword,
            name: "Admin User",
            role: Role.ADMIN,
            subscription: {
                create: {
                    planType: PlanType.PRO,
                    isActive: true,
                },
            },
            usage: {
                create: {
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear(),
                    validationCount: 0,
                },
            },
        },
    });
    console.log("Admin user created successfully");
    
    }


}