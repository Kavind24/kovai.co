Prerequisites for TestAPP to run:

API:
 1. Install the required nuget packages by Right click on Project (TestApp.Api) --> Manage Nuget packages
      Required packages:
	1. Microsoft.EntityFrameworkCore.SqlServer
	2. Microsoft.EntityFrameworkCore.Tools
 2. Change the database connection string in "appsettings.Development.json" file with your db server name in place of "YOURSERVERNAME" in below block
	Eg: "ConnectionStrings": {
    		"TestAppDB": "Server=YOURSERVERNAME;Database=TestApp;Integrated Security=True;Encrypt=false;TrustServerCertificate=true"
  	      },
 3. If you not running the application in local, Please replace the content of "appsettings.json" file with content of "appsettings.Development.json" file.

DATABASE:
 1. Create the required Database, Tables and Insert data into tables by executing the scripts given in Setup folder in repos. 
    [Filename: DB_Scripts.sql]
 2. If found any issues in Step 1, I have Aaso added Backup (TestApp.bak) of the database in Setup forlder. Please use it to restore the database. 

WEB:
 1. Try "npm install" command. IF fails please try "npm install --force".(It is due to facebook plugin installed)
 2. npm start to run the application.

NOTE: Make sure you run both API and Database are built and executed before running WEB application.

SAMPLE USERS:
  1. ADMIN -  Email = admin@test.com ,  Password = admin@123
  2. MEMBER - Email = member@test.com , Password = member@123

FOR FACEBOOK LOGIN
  1. You can use your own Facebook credentials to login, which will be registered as MEMBER user.
  2. From the second time you can login with your Facebook email or username in normal login with password "facebooklogin", which will log in as MEMBER.
