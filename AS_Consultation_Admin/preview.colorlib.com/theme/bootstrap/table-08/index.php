

<?php
// Simple Authentication
$valid_username = 'AS_Consultation_Admin'; // change to your desired username
$valid_password = 'AS_Consultation_Admin@123'; // change to your desired password

if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW']) ||
    $_SERVER['PHP_AUTH_USER'] !== $valid_username ||
    $_SERVER['PHP_AUTH_PW'] !== $valid_password) {
    
    header('WWW-Authenticate: Basic realm="Restricted Area"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Access Denied: Invalid username or password.';
    exit;
}

// Database Connection
$host = 'localhost'; // Change if your DB host is different
$username = 'u591848023_infoartofcode';  // Change to your database username
$password = 'ArtOfCoders798#23';      // Change to your database password
$dbname = 'u591848023_conult_db'; // Your database name

$conn = new mysqli($host, $username, $password, $dbname);

// Check Connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch Data from 'contactus' Table
$sql = "SELECT firstName, lastName, email, phone, message FROM contactus";
$result = $conn->query($sql);
?>

<!doctype html>
<html lang="en">

<head>
    <title>Contact Us Table</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style.css">

    <style>
        html, body {
            height: 100%;
            margin: 0;
            display: flex;
            flex-direction: column;
        }
        footer {
            margin-top: auto;
            text-align: center;
            padding: 10px;
            background: #333;
            color: white;
            width: 100%;
        }
    </style>
</head>

<body>
    <!-- Navbar -->
    <nav style="display: flex; justify-content: space-between; padding: 10px; background: #333; color: white;">
        <div style="font-size: 22px; font-weight: bold;">AS Consultation</div>
        <a href="#" style="background: #ff5722; padding: 8px 15px; color: white; text-decoration: none; border-radius: 5px;">Admin Panel</a>
    </nav>

    <!-- Table Section -->
    <section class="ftco-section">
        <div class="container">
            <h2 class="heading-section text-center">Contact Us</h2>
            <div class="table-wrap" style="overflow-x: auto; max-width: 100%;">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        if ($result->num_rows > 0) {
                            $count = 1;
                            while ($row = $result->fetch_assoc()) {
                                echo "<tr>
                                    <td>{$count}</td>
                                    <td>{$row['firstName']}</td>
                                    <td>{$row['lastName']}</td>
                                    <td>{$row['email']}</td>
                                    <td>{$row['phone']}</td>
                                    <td>{$row['message']}</td>
                                </tr>";
                                $count++;
                            }
                        } else {
                            echo "<tr><td colspan='6' class='text-center'>No records found</td></tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        Copyright © 2025 AS Consultation | Designed & Developed By 
        <a href="https://artofcoders.com/" style="color: #ff9800;">Art Of Coders</a>
    </footer>

    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
</body>
</html>

<?php $conn->close(); ?>


<!-- <!doctype html>
<html lang="en">

<head>
    <title>Table 08</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,700' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="css/style.css">

</head>

<body>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 text-center mb-4">
                    <h2 class="heading-section">Table #08</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h3 class="h5 mb-4 text-center">Collapsible Table</h3>
                    <div class="table-wrap">
                        <table class="table myaccordion table-hover" id="accordion">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    <th scope="row">1</th>
                                    <td>Laptop Technology AS2020</td>
                                    <td>$200.00</td>
                                    <td>2</td>
                                    <td>$400.00</td>
                                    <td>
                                        <i class="fa" aria-hidden="true"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6" id="collapseOne" class="collapse show acc" data-parent="#accordion">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro iste, facere sunt sequi nostrum ipsa, amet doloremque magnam reiciendis tempore sapiente. Necessitatibus recusandae harum nam sit perferendis quia
                                            inventore natus.</p>
                                    </td>
                                </tr>

                                <tr data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" class="collapsed">
                                    <th scope="row">2</th>
                                    <td>Laptop Technology AS2020</td>
                                    <td>$200.00</td>
                                    <td>2</td>
                                    <td>$400.00</td>
                                    <td>
                                        <i class="fa" aria-hidden="false"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6" id="collapseTwo" class="collapse acc" data-parent="#accordion">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro iste, facere sunt sequi nostrum ipsa, amet doloremque magnam reiciendis tempore sapiente. Necessitatibus recusandae harum nam sit perferendis quia
                                            inventore natus.</p>
                                    </td>
                                </tr>

                                <tr data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" class="collapsed">
                                    <th scope="row">3</th>
                                    <td>Laptop Technology AS2020</td>
                                    <td>$200.00</td>
                                    <td>2</td>
                                    <td>$400.00</td>
                                    <td>
                                        <i class="fa" aria-hidden="false"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6" id="collapseThree" class="collapse acc" data-parent="#accordion">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro iste, facere sunt sequi nostrum ipsa, amet doloremque magnam reiciendis tempore sapiente. Necessitatibus recusandae harum nam sit perferendis quia
                                            inventore natus.</p>
                                    </td>
                                </tr>

                                <tr data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" class="collapsed">
                                    <th scope="row">4</th>
                                    <td>Laptop Technology AS2020</td>
                                    <td>$200.00</td>
                                    <td>2</td>
                                    <td>$400.00</td>
                                    <td>
                                        <i class="fa" aria-hidden="false"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="6" id="collapseFour" class="collapse acc" data-parent="#accordion">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro iste, facere sunt sequi nostrum ipsa, amet doloremque magnam reiciendis tempore sapiente. Necessitatibus recusandae harum nam sit perferendis quia
                                            inventore natus.</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>

    <script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"rayId":"9192df073ff6bf6d","serverTiming":{"name":{"cfExtPri":true,"cfL4":true,"cfSpeedBrain":true,"cfCacheStatus":true}},"version":"2025.1.0","token":"cd0b4b3a733644fc843ef0b185f98241"}'
        crossorigin="anonymous"></script>
</body>

</html> -->

