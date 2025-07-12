// DOM Elements
const employeeList = document.getElementById('employeeList');
const searchInput = document.getElementById('searchInput');
const formContainer = document.getElementById('formContainer');
const employeeForm = document.getElementById('employeeForm');
const filterPanel = document.getElementById('filterPanel');
const pagination = document.getElementById('paginationControls');
const sortFieldSelect = document.getElementById('sortField');
const sortOrderSelect = document.getElementById('sortOrder');
const itemsPerPageSelect = document.getElementById('itemsPerPage');

// Data and State
let filteredEmployees = [...mockEmployees];
let editingId = null;
let currentPage = 1;
let itemsPerPage = 10;
let sortField = '';
let sortOrder = 'asc';

// Render Employees with Filter + Sort + Pagination
function renderEmployees(data) {
  // Sort
  if (sortField) {
    data.sort((a, b) => {
      const valA = a[sortField].toLowerCase();
      const valB = b[sortField].toLowerCase();
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  // Pagination
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = data.slice(start, end);

  employeeList.innerHTML = '';
  if (paginatedData.length === 0) {
    employeeList.innerHTML = '<p>No employees found.</p>';
    return;
  }

  paginatedData.forEach(emp => {
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.setAttribute('data-id', emp.id);
    card.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <div class='employee-buttons'>
        <button onclick="editEmployee(${emp.id})">Edit</button>
        <button onclick="deleteEmployee(${emp.id})">Delete</button>
      </div>
    `;
    employeeList.appendChild(card);
  });

  renderPaginationControls(data.length);
}

// Pagination Buttons
function renderPaginationControls(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pagination.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    if (i === currentPage) btn.classList.add('active');
    btn.onclick = () => {
      currentPage = i;
      renderEmployees(filteredEmployees);
    };
    pagination.appendChild(btn);
  }
}

// Show Add/Edit Form
function showForm(edit = false) {
  document.getElementById('formTitle').textContent = edit ? 'Edit Employee' : 'Add Employee';
  formContainer.classList.add('visible');
  formContainer.classList.remove('hidden');
  employeeList.style.display = 'none';
}

// Cancel Form
function cancelForm() {
  formContainer.classList.remove('visible');
  formContainer.classList.add('hidden');
  employeeForm.reset();
  editingId = null;
  employeeList.style.display = 'flex';
}

// Submit Form
employeeForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const newEmp = {
    id: editingId || Date.now(),
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    department: document.getElementById('department').value,
    role: document.getElementById('role').value,
  };

  if (editingId) {
    const index = mockEmployees.findIndex(emp => emp.id === editingId);
    if (index !== -1) mockEmployees[index] = newEmp;
  } else {
    mockEmployees.push(newEmp);
  }

  filteredEmployees = [...mockEmployees];
  renderEmployees(filteredEmployees);
  cancelForm();
});

// Edit Employee
function editEmployee(id) {
  const emp = mockEmployees.find(e => e.id === id);
  if (!emp) return;

  document.getElementById('employeeId').value = emp.id;
  document.getElementById('firstName').value = emp.firstName;
  document.getElementById('lastName').value = emp.lastName;
  document.getElementById('email').value = emp.email;
  document.getElementById('department').value = emp.department;
  document.getElementById('role').value = emp.role;

  editingId = id;
  showForm(true);
}

// Delete Employee
function deleteEmployee(id) {
  if (!confirm('Are you sure you want to delete this employee?')) return;
  const index = mockEmployees.findIndex(emp => emp.id === id);
  if (index !== -1) mockEmployees.splice(index, 1);
  filteredEmployees = [...mockEmployees];
  renderEmployees(filteredEmployees);
}

// Show/Hide Filter Panel
function showFilter() {
  filterPanel.classList.toggle('visible');
  filterPanel.classList.toggle('hidden');
}

// Apply Filter
function applyFilter() {
  const name = document.getElementById('filterFirstName').value.toLowerCase();
  const dept = document.getElementById('filterDepartment').value.toLowerCase();
  const role = document.getElementById('filterRole').value.toLowerCase();

  filteredEmployees = mockEmployees.filter(emp =>
    emp.firstName.toLowerCase().includes(name) &&
    emp.department.toLowerCase().includes(dept) &&
    emp.role.toLowerCase().includes(role)
  );

  currentPage = 1;
  renderEmployees(filteredEmployees);
}

// Reset Filter
function resetFilter() {
  document.getElementById('filterFirstName').value = '';
  document.getElementById('filterDepartment').value = '';
  document.getElementById('filterRole').value = '';
  filteredEmployees = [...mockEmployees];
  currentPage = 1;
  renderEmployees(filteredEmployees);
}

// Live Search
searchInput.addEventListener('input', function () {
  const value = this.value.toLowerCase();
  const result = filteredEmployees.filter(emp =>
    emp.firstName.toLowerCase().includes(value) ||
    emp.lastName.toLowerCase().includes(value) ||
    emp.email.toLowerCase().includes(value)
  );
  renderEmployees(result);
});

// Sort Field Change
sortFieldSelect.addEventListener('change', function () {
  sortField = this.value;
  currentPage = 1;
  renderEmployees(filteredEmployees);
});

// Sort Order Change
sortOrderSelect.addEventListener('change', function () {
  sortOrder = this.value;
  currentPage = 1;
  renderEmployees(filteredEmployees);
});

// Items Per Page Change
itemsPerPageSelect.addEventListener('change', function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderEmployees(filteredEmployees);
});

// Initial Load
renderEmployees(filteredEmployees);
