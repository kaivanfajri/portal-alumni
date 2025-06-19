const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function hashAllPasswords() {
  const alumniList = await prisma.alumni.findMany();
  
  for (const alumni of alumniList) {
    // Skip jika password sudah ter-hash (cek pola hash bcrypt)
    if (alumni.password.startsWith('$2a$')) continue;
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(alumni.password, salt);
    
    await prisma.alumni.update({
      where: { id: alumni.id },
      data: { password: hashedPassword }
    });
    
    console.log(`Updated password for NIM: ${alumni.nim}`);
  }
}

hashAllPasswords()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());