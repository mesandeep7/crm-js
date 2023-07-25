// Sample customer data for demonstration purposes
const customers = [
    // Add more customer data here as needed
  ];
  
  // Function to populate the customer table dynamically
  function populateCustomerTable() {
    const tableBody = document.querySelector("table tbody");
  
    // Clear existing table rows
    tableBody.innerHTML = "";
  
    // Populate table rows with customer data
    customers.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${customer.firstName}</td>
        <td>${customer.lastName}</td>
        <td>${customer.email}</td>
        <td>
          <button onclick="editCustomer('${customer.email}')">Update</button>
          <button onclick="deleteCustomer('${customer.email}')">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to show the "Add Customer" form
  function showAddCustomerForm() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
  }
  
  // Function to hide the "Add Customer" form
  function hideAddCustomerForm() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
  }
  
  // Function to handle form submission when adding a new customer
  document.getElementById("addCustomerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get form values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
  
    // Add the new customer to the array
    customers.push({ firstName, lastName, email });
  
    // Repopulate the customer table
    populateCustomerTable();
  
    // Clear the form fields and hide the form
    document.getElementById("addCustomerForm").reset();
    hideAddCustomerForm();
  });
  
  // Function to handle customer deletion
  function deleteCustomer(email) {
    // Find the index of the customer with the specified email
    const index = customers.findIndex((customer) => customer.email === email);
  
    // If the customer is found, remove it from the array
    if (index !== -1) {
      customers.splice(index, 1);
      // Repopulate the customer table after deletion
      populateCustomerTable();

      hideEditCustomerForm();
    }
  }
  
  // Function to show the "Edit Customer" form
  function showEditCustomerForm(email) {
    const customer = customers.find((customer) => customer.email === email);
    if (customer) {
      document.getElementById("editFirstName").value = customer.firstName;
      document.getElementById("editLastName").value = customer.lastName;
      document.getElementById("editEmail").value = customer.email;
      const editFormOverlay = document.getElementById("editCustomerFormOverlay");
      editFormOverlay.style.display = "block";
      editFormOverlay.onsubmit = function (e) {
        e.preventDefault();
        const editedFirstName = document.getElementById("editFirstName").value;
        const editedLastName = document.getElementById("editLastName").value;
        const editedEmail = document.getElementById("editEmail").value;
  
        // Update the customer data in the array
        customer.firstName = editedFirstName;
        customer.lastName = editedLastName;
        customer.email = editedEmail;
  
        // Repopulate the customer table after editing
        populateCustomerTable();
  
        // Hide the edit form
        hideEditCustomerForm();
      };
    }
  }
  
  // Function to hide the "Edit Customer" form
  function hideEditCustomerForm() {
    const editFormOverlay = document.getElementById("editCustomerFormOverlay");
    editFormOverlay.style.display = "none";
  }
  
  // Function to handle customer editing
  function editCustomer(email) {
    showEditCustomerForm(email);
  }
  
  // Initial population of the customer table when the page loads
  document.addEventListener("DOMContentLoaded", function () {
    populateCustomerTable();
  });