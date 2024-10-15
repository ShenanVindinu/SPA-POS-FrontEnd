$(document).ready(function() {
    // Load all customer IDs into the dropdown
    $.ajax({
        url: 'http://localhost:8080/POS_BackEnd/api/v1/customer',  // Your API endpoint to get all customers
        method: 'GET',
        success: function(data) {
            var dropdownMenu = $('#CustomerIDDropDownMenu');
            dropdownMenu.empty();  // Clear the dropdown

            data.forEach(function(customer) {
                // Add customer to dropdown
                var listItem = `<li><a class="dropdown-item" href="#" data-id="${customer.id}" 
                                        data-name="${customer.name}" 
                                        data-salary="${customer.salary}" 
                                        data-address="${customer.address}">
                                        ${customer.id}</a></li>`;
                dropdownMenu.append(listItem);
            });
        },
        error: function(error) {
            console.error("Error fetching customer data:", error);
        }
    });

    // Handle customer selection and autofill fields
    $(document).on('click', '#CustomerIDDropDownMenu .dropdown-item', function(event) {
        event.preventDefault();

        // Get customer details from the clicked dropdown item
        var customerID = $(this).data('id');
        var customerName = $(this).data('name');
        var customerSalary = $(this).data('salary');
        var customerAddress = $(this).data('address');

        // Set the fields with selected customer data
        $('#CustomerIDField2').val(customerID);        // Customer ID
        $('#CustomerNameField2').val(customerName);    // Customer Name
        $('#CustomerSalaryField2').val(customerSalary); // Customer Salary
        $('#CustomerAddressField2').val(customerAddress); // Customer Address
    });
});

$(document).ready(function() {
    // Load all items into the dropdown
    $.ajax({
        url: 'http://localhost:8080/POS_BackEnd/api/v1/item',  // Your API endpoint to get all items
        method: 'GET',
        success: function(data) {
            var dropdownMenu = $('#ItemDropDownMenu');
            dropdownMenu.empty();  // Clear the dropdown

            data.forEach(function(item) {
                // Add item to dropdown
                var listItem = `<li><a class="dropdown-item" href="#" data-code="${item.id}" 
                                        data-name="${item.name}" 
                                        data-price="${item.price}" 
                                        data-qty="${item.qty}">
                                        ${item.name}</a></li>`;
                dropdownMenu.append(listItem);
            });
        },
        error: function(error) {
            console.error("Error fetching items:", error);
        }
    });

    // Handle item selection and autofill fields
    $(document).on('click', '#ItemDropDownMenu .dropdown-item', function(event) {
        event.preventDefault();

        // Get item details from the clicked dropdown item
        var itemCode = $(this).data('code');
        var itemName = $(this).data('name');
        var itemPrice = $(this).data('price');
        var qtyOnHand = $(this).data('qty');

        // Set the fields with selected item data
        $('#ItemCodeField2').val(itemCode);    // Item Code
        $('#ItemNameField2').val(itemName);    // Item Name
        $('#ItemPriceField2').val(itemPrice);  // Item Price
        $('#QtyOnHandField').val(qtyOnHand);   // QTY on Hand
    });
});

$(document).ready(function() {


    
    $('#AddToCart').on('click', function() {

        var cartTotal = 0;
        
        var itemCode = $('#ItemCodeField2').val();
        var itemName = $('#ItemNameField2').val();
        var itemPrice = parseFloat($('#ItemPriceField2').val());  // Convert to float for calculations
        var orderQty = parseInt($('#OrderQtyField').val());

        
        var total = itemPrice * orderQty;

        // Check if all fields are filled before adding to the cart
        if (itemCode && itemName && itemPrice && orderQty) {
            var newRow = `<tr>
                            <td>${itemCode}</td>
                            <td>${itemName}</td>
                            <td>${itemPrice.toFixed(2)}</td>
                            <td>${orderQty}</td>
                            <td>${total.toFixed(2)}</td>
                          </tr>`;

            
            $('#OrderTableBodyID').append(newRow);

            // Update the total of the cart
            cartTotal += total;

            // Set the new total value in the #totalText element
            $('#totalText').text('Total : Rs.' + cartTotal.toFixed(2));

            //clear the input fields after adding the item to the cart
            $('#ItemCodeField2').val('');
            $('#ItemNameField2').val('');
            $('#ItemPriceField2').val('');
            $('#QtyOnHandField').val('');
            $('#OrderQtyField').val('');
        } else {
            alert('Please fill in all fields before adding to the cart.');
        }
    });
});

