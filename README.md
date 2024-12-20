# car_rental
Website for car rental reservations.

<strong>The code is built with:</strong> <br>
--> Spring Boot (Java) - backend <br>
--> Angular - frontend <br>
   -> TypeScript <br>
   -> CSS <br>
   -> HTML <br>
--> Database (MySQL)<br>
<br>
The project is named Urban Elite. It is a website designed for the purpose of renting cars.<br>
<br>
<strong>It is divided into 4 main components:</strong> <br>
-> User <br>
-> Customer <br>
-> Seller <br>
-> Admin<br>
<br>
<strong><i>So, what does each part do?......</i></strong><br>
<hr>
<br>
<strong>-> User</strong><br>
A User is considered anyone who visits the website and can view the content of the Home/About/Fleet/Brand/Contact/Service pages. However, there are restrictions... (which will be clarified below::::::) <br>
-- The Home page contains an introduction to Urban Elite, with sections like About Us, Service, Most Selling, Testimonials, and FAQs. <br>
-- The About page contains information about the Urban Elite company. <br>
-- The Service page lists the services offered by Urban Elite. <br>
-- The Fleet page displays all the cars available for rent. This page includes filters that can be applied based on price, car brand, and car type. Additionally, there's a sorting option (A-Z || Z-A), and price sorting (Low to High || High to Low). On this page, when you click on a car, the "Book Now" button will direct you to the details of the car you clicked on.<br>
<br>
(Clarification: The Contact and Brands pages are not yet completed, so nothing will appear on those pages.)<br>
<br>
<strong>-> Customer</strong><br> 
A Customer is a User, but with some differences... As explained earlier, a User has certain limitations... A simple User cannot book a car. To make a booking, you first need to register an account on this website. After registration, you can log in, and your name and photo will appear in the navigation bar. At this point, you're no longer considered a User but a Customer. A Customer has the privilege of being able to reserve a car and wait for the approval message of their booking. When you click on your image in the navigation bar, it will direct you to the Customer Dashboard, where you can check if the car reservation has been approved or not, and also view all your registration details.<br>
<br>
<strong>-> Seller</strong><br> 
Sellers are those who list cars for sale. A Seller has their own separate page, which cannot be accessed directly from the Urban Elite website. You need to type "/seller" in the URL to access it. The Seller is the person who approves or rejects the car requests made by the Customers.<br>
<br>
<strong>-> Admin</strong><br> 
The Admin is the administrator of the website who creates Sellers and has the authority to modify or delete them. Therefore, Sellers cannot be created by anyone, but only by the Admin of the website.<br>
<br>
A brief description of this project.<br>
<br>
