# ใช้ Node เวอร์ชัน 20

FROM node:20

# ตั้ง working directory ใน container

WORKDIR /app

# copy package.json และ package-lock.json

COPY package*.json ./

# ติดตั้ง dependencies

RUN npm install

# copy source code ทั้งหมดเข้า container

COPY . .

# เปิด port ของ Vite

EXPOSE 5173

# รัน vite dev server

CMD ["npm", "run", "dev", "--", "--host"]
