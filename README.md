Ticket Management Application
📋 Description
The Ticket Management application allows you to create, read, update and delete tickets.
It is composed of:

Frontend: Angular (TypeScript)
Backend: REST API in .NET 8 with SQL Server

🗂️ Project Structure

TicketManagementApp/
├── frontend/ # Angular Application
└── backend/ # .NET 8 API

🛠️ Prerequisites
Before you begin, make sure that you have the following installed:

Node.js
Angular CLI: 18.2.8
npm install -g @angular/cli
.NET SDK (version 8 or higher)
SQL Server
Visual Studio & Visual Studio Code.

⚙️ Project Setup
Step 1: Backend Setup and Run (.NET API)
Go to the backend folder:
cd backend

- Configure SQL Server connection:

file : appsettings.json
{
"ConnectionStrings": {
"DefaultConnection": "Server=myservername;Database=Db_Tickets;User Id=User_TicketAPI;Password=xxx;MultipleActiveResultSets=True;TrustServerCertificate=True"
},
}
table:

CREATE TABLE Tickets (
TicketID INT PRIMARY KEY IDENTITY(1,1),
Description NVARCHAR(255) NOT NULL,  
 Status NVARCHAR(10) CHECK (Status IN ('Open', 'Closed')),
Date DATETIME DEFAULT GETDATE(),  
);

- Restore packages and create database:

dotnet restore
dotnet ef database update
Run the backend:
dotnet run
The backend is accessible at https://localhost:44322/swagger.

Step 2: Configuring and Running the Frontend (Angular)

- Go to the frontend folder:

cd ../frontend

- Install dependencies:
  npm install
  npm install @angular/common
  npm install @angular/router
  npm install @angular/flex-layout
  ng add @angular/material

Configure the API URL:

Open the src/app/services/ticket.service.ts file and set the API URL:
export const environment = {
private apiUrl = 'http://localhost:5022/api/tickets';
};
Run the Angular application:
ng serve --open

The frontend is accessible at http://localhost:4200/tickets.
🚀 Running the Full Application
Running the backend:
Open a terminal in the backend/ folder and run:

dotnet run
Running the frontend:
Open a terminal in the frontend/ folder and run:
ng serve
Accessing the application:
Open a browser to the following address:
http://localhost:4200/tickets

📚 API Documentation
The Swagger documentation can be found here:
http://localhost:5022/swagger/index.html

📝 Authors
Amanne Fatima Ezzahra – Full Stack Developer

📧 Contact
If you have any questions, feel free to contact me at:
fz.amanne@gmail.com

📦 Clone the Project
Clone the GitHub repository:

bash
Copy the code
git clone https://github.com/fatimaezzahraamanne/TicketManagement.git
Access the project:
cd TicketManagementApp
Configure and run as described above.
