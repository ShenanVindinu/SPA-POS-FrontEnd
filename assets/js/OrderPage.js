$(document).ready(function() {

    setDate(); 

    function setDate() {
        var today = new Date().toISOString().split('T')[0];
        $('#OrderDateField').val(today);
    }

    //Load all customer IDs into the dropdown
    $.ajax({
        url: 'http://localhost:8080/POS_BackEnd/api/v1/customer',
        method: 'GET',
        success: function(data) {
            var dropdownMenu = $('#CustomerIDDropDownMenu');
            dropdownMenu.empty();  

            data.forEach(function(customer) {
                var listItem = `<li><a class="dropdown-item" href="#" 
                                    data-id="${customer.id}" 
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

    //Handle selection from dropdown and autofill the fields
    $(document).on('click', '.dropdown-item', function(event) {
        event.preventDefault();
        
        // Get customer details from the selected dropdown item
        var customerID = $(this).data('id');
        var customerName = $(this).data('name');
        var customerSalary = $(this).data('salary');
        var customerAddress = $(this).data('address');

        // Set the fields with selected customer data
        $('#CustomerIDField2').val(customerID);
        $('#CustomerNameField2').val(customerName);
        $('#CustomerSalaryField2').val(customerSalary);
        $('#CustomerAddressField2').val(customerAddress);
    });

});