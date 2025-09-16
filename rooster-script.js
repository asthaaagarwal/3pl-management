// Global State
let currentPage = 1;
let pageSize = 10;
let searchTerm = '';
let statusFilter = '';
let selectedCompanies = new Set();
let companies = [];
let businesses = [
    {
        id: 'BUS001',
        name: 'Global Logistics Co.',
        brn: 'BRN123456789',
        type: 'Logistics',
        insuranceType: 'single',
        companiesCount: 5,
        sapCode: 'SAP001',
        ownerName: 'John Smith',
        ownerPhone: '+966-50-123-4567',
        ownerBirthday: '1985-03-15',
        bankName: 'Saudi National Bank',
        bankNumber: '1234567890123',
        accountHolder: 'Global Logistics Co.',
        businessLocation: 'Riyadh',
        headOfficeLocation: 'King Fahd Road, Riyadh',
        openingDate: '2020-01-15',
        brnVerified: true,
        bankVerified: true
    },
    {
        id: 'BUS002',
        name: 'Express Delivery Ltd.',
        brn: 'BRN987654321',
        type: 'Express Services',
        insuranceType: 'intermediary-self',
        companiesCount: 12,
        sapCode: 'SAP002',
        ownerName: 'Sarah Ahmed',
        ownerPhone: '+966-55-987-6543',
        ownerBirthday: '1990-07-22',
        bankName: 'Al Rajhi Bank',
        bankNumber: '9876543210987',
        accountHolder: 'Express Delivery Ltd.',
        businessLocation: 'Jeddah',
        headOfficeLocation: 'Corniche Road, Jeddah',
        openingDate: '2018-05-10',
        brnVerified: true,
        bankVerified: true
    },
    {
        id: 'BUS003',
        name: 'WW International Shipping',
        brn: 'BRN456789123',
        type: 'International Freight',
        insuranceType: 'intermediary-ww',
        companiesCount: 8,
        sapCode: 'SAP003',
        ownerName: 'Ahmed Al-Rashid',
        ownerPhone: '+966-56-234-5678',
        ownerBirthday: '1982-11-08',
        bankName: 'Samba Bank',
        bankNumber: '4567891234567',
        accountHolder: 'WW International Shipping',
        businessLocation: 'Dammam',
        headOfficeLocation: 'Industrial Area, Dammam',
        openingDate: '2019-03-20',
        brnVerified: true,
        bankVerified: true
    }
];

// Sample Data (In production, this would come from API)
const sampleCompanies = [
    {
        id: 756,
        name: 'qayemha_logistics_ftr',
        phone: '+966-11-456-7890',
        address: '123 Industrial Road, Riyadh, Saudi Arabia',
        businessId: 'BUS001',
        businessName: 'Qayemha Logistics',
        deliveryArea: 'Goya centro',
        status: 'preparing',
        adminName: 'Ahmed Al-Rashid',
        adminPhone: '+966-50-123-4567',
        adminId: 'ADM001',
        createdAt: '2024-01-15',
        contractId: 'CON001'
    },
    {
        id: 654,
        name: 'masarat_alsahra_ftr',
        phone: '+966-11-567-8901',
        address: '456 Commerce Street, Jeddah, Saudi Arabia',
        businessId: 'BUS002',
        businessName: 'Masarat Al Sahra',
        deliveryArea: 'Goya',
        status: 'operating',
        adminName: 'Sarah Ahmed',
        adminPhone: '+966-55-987-6543',
        adminId: 'ADM002',
        createdAt: '2024-02-01',
        contractId: 'CON002'
    },
    {
        id: 901,
        name: 'tomorrows_wealth_co_ftr',
        phone: '+966-11-678-9012',
        address: '789 Business District, Dammam, Saudi Arabia',
        businessId: 'BUS003',
        businessName: 'Tomorrow\'s Wealth Co',
        deliveryArea: 'Azul',
        status: 'operating',
        adminName: 'Kim Jong-Un',
        adminPhone: '+82-10-1234-5678',
        adminId: 'ADM003',
        createdAt: '2024-01-20',
        contractId: 'CON003'
    },
    {
        id: 432,
        name: 'nakhat_altareiq_ftr',
        phone: '+966-11-789-0123',
        address: '321 Transport Avenue, Mecca, Saudi Arabia',
        businessId: 'BUS004',
        businessName: 'Nakhat Al Tareiq',
        deliveryArea: 'Buenos aires norte',
        status: 'suspended',
        ceoEmail: 'ceo@nakhat.com',
        createdAt: '2024-01-10',
        contractId: 'CON004'
    },
    {
        id: 731,
        name: 'wared_alkhalej_ftr',
        phone: '+966-11-890-1234',
        address: '654 Logistics Zone, Medina, Saudi Arabia',
        businessId: 'BUS005',
        businessName: 'Wared Al Khalej',
        deliveryArea: 'Catamarca',
        status: 'terminated',
        ceoEmail: 'ceo@wared.com',
        createdAt: '2023-12-15',
        contractId: 'CON005'
    },
    {
        id: 962,
        name: 'harkan_ftr',
        businessId: 'BUS006',
        businessName: 'Harkan Transport',
        deliveryArea: 'Comodoro rivadavia',
        status: 'suspended',
        ceoEmail: 'ceo@harkan.com',
        createdAt: '2024-01-05',
        contractId: 'CON006'
    },
    {
        id: 452,
        name: 'weesam_alkhaleej_ftr',
        businessId: 'BUS007',
        businessName: 'Weesam Al Khaleej',
        deliveryArea: 'Corrientes resistencia',
        status: 'terminated',
        ceoEmail: 'ceo@weesam.com',
        createdAt: '2023-11-20',
        contractId: 'CON007'
    },
    {
        id: 233,
        name: 'renad_logistics_ftr',
        businessId: 'BUS008',
        businessName: 'Renad Logistics',
        deliveryArea: 'Esperanza',
        status: 'termination-requested',
        ceoEmail: 'ceo@renad.com',
        createdAt: '2023-12-01',
        contractId: 'CON008'
    },
    {
        id: 234,
        name: 'akbar_almtahedon_ftr',
        businessId: 'BUS009',
        businessName: 'Akbar Al Mtahedon',
        deliveryArea: 'Gba oeste',
        status: 'preparing',
        ceoEmail: 'ceo@akbar.com',
        createdAt: '2024-02-10',
        contractId: 'CON009'
    }
];

const sampleBusinesses = [
    {
        id: 'BUS001',
        name: 'Qayemha Logistics',
        brn: 'BRN001234567',
        type: 'Logistics',
        insuranceType: 'single',
        companiesCount: 1,
        bankName: 'Saudi National Bank',
        bankNumber: 'ACC123456789',
        accountHolder: 'Qayemha Logistics Ltd',
        ownerName: 'Ahmed Al Qayemha',
        ownerPhone: '+966501234567',
        ownerBirthday: '1980-05-15',
        businessLocation: 'Riyadh, Saudi Arabia',
        headOfficeLocation: 'King Fahd Road, Riyadh',
        openingDate: '2020-01-15',
        sapCode: 'SAP001',
        brnVerified: true,
        bankVerified: true
    },
    {
        id: 'BUS002',
        name: 'Masarat Al Sahra',
        brn: 'BRN001234568',
        type: 'Express Services',
        insuranceType: 'intermediary-self',
        companiesCount: 3,
        bankName: 'Al Rajhi Bank',
        bankNumber: 'ACC123456790',
        accountHolder: 'Masarat Al Sahra Co',
        ownerName: 'Mohammad Al Masarat',
        ownerPhone: '+966501234568',
        ownerBirthday: '1975-08-22',
        businessLocation: 'Jeddah, Saudi Arabia',
        headOfficeLocation: 'Corniche Road, Jeddah',
        openingDate: '2019-03-10',
        sapCode: 'SAP002',
        brnVerified: true,
        bankVerified: true
    },
    {
        id: 'BUS003',
        name: 'WW International Shipping',
        brn: 'BRN456789123',
        type: 'International Freight',
        insuranceType: 'intermediary-ww',
        companiesCount: 8,
        sapCode: 'SAP003',
        ownerName: 'Ahmed Al-Rashid',
        ownerPhone: '+966-56-234-5678',
        ownerBirthday: '1982-11-08',
        bankName: 'Samba Bank',
        bankNumber: '4567891234567',
        accountHolder: 'WW International Shipping',
        businessLocation: 'Dammam',
        headOfficeLocation: 'Industrial Area, Dammam',
        openingDate: '2019-03-20',
        brnVerified: true,
        bankVerified: true
    }
];

// Data persistence functions
function saveBusinessesToLocalStorage() {
    localStorage.setItem('rooster-businesses', JSON.stringify(businesses));
}

function saveCompaniesToLocalStorage() {
    localStorage.setItem('rooster-companies', JSON.stringify(companies));
}

function loadBusinessesFromLocalStorage() {
    const saved = localStorage.getItem('rooster-businesses');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Error parsing saved businesses:', e);
            return [...sampleBusinesses];
        }
    }
    return [...sampleBusinesses];
}

function loadCompaniesFromLocalStorage() {
    const saved = localStorage.getItem('rooster-companies');
    if (saved) {
        try {
            return JSON.parse(saved);
        } catch (e) {
            console.error('Error parsing saved companies:', e);
            return [...sampleCompanies];
        }
    }
    return [...sampleCompanies];
}

// Utility function to clear all saved data (useful for development/reset)
function clearAllSavedData() {
    localStorage.removeItem('rooster-businesses');
    localStorage.removeItem('rooster-companies');
    location.reload(); // Reload to show default data
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    companies = loadCompaniesFromLocalStorage();
    businesses = loadBusinessesFromLocalStorage();
    
    initializeEventListeners();
    renderCompaniesTable();
    renderBusinessesTable();
    populateBusinessOptions();
});

function initializeEventListeners() {
    // Sidebar navigation
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', handleSidebarNavigation);
    });
    
    // Sidebar submenu navigation
    document.querySelectorAll('.sidebar-sublink').forEach(link => {
        link.addEventListener('click', handleSubmenuNavigation);
    });
    
    // Search and filter functionality
    document.getElementById('company-search')?.addEventListener('input', handleSearch);
    document.getElementById('status-filter')?.addEventListener('change', (e) => handleStatusFilter(e.target.value));
    document.getElementById('business-search')?.addEventListener('input', handleBusinessSearch);
    
    // Form submissions
    document.getElementById('create-company-form')?.addEventListener('submit', handleCreateCompany);
    document.getElementById('create-business-form')?.addEventListener('submit', handleCreateBusiness);
    
    // Select all checkbox
    document.getElementById('select-all')?.addEventListener('change', toggleSelectAll);
    
    // Close modals when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target.id);
        }
    });
}

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update sidebar active state
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.sidebar-sublink').forEach(link => {
        link.classList.remove('active');
    });
    
    // Find and activate corresponding sidebar link
    const correspondingLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (correspondingLink) {
        correspondingLink.classList.add('active');
        
        // If it's a submenu item, also activate parent
        if (correspondingLink.classList.contains('sidebar-sublink')) {
            const parentLink = correspondingLink.closest('.sidebar-item').querySelector('.sidebar-link');
            if (parentLink) {
                parentLink.classList.add('active');
            }
        }
    }
}

function handleSidebarNavigation(e) {
    e.preventDefault();
    const section = e.currentTarget.getAttribute('data-section');
    const parentItem = e.currentTarget.closest('.sidebar-item');
    
    // Handle submenu toggle for Partner management
    if (parentItem.classList.contains('has-submenu')) {
        const submenu = parentItem.querySelector('.sidebar-submenu');
        const arrow = parentItem.querySelector('.submenu-arrow');
        
        if (submenu.classList.contains('show')) {
            submenu.classList.remove('show');
            arrow.style.transform = 'rotate(-90deg)';
        } else {
            submenu.classList.add('show');
            arrow.style.transform = 'rotate(0deg)';
        }
    }
    
    // Update active sidebar link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.sidebar-sublink').forEach(link => {
        link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Show corresponding section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function handleSubmenuNavigation(e) {
    e.preventDefault();
    const section = e.currentTarget.getAttribute('data-section');
    
    // Update active submenu link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.sidebar-sublink').forEach(link => {
        link.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Keep parent menu active
    const parentLink = e.currentTarget.closest('.sidebar-item').querySelector('.sidebar-link');
    if (parentLink) {
        parentLink.classList.add('active');
    }
    
    // Show corresponding section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function renderCompaniesTable() {
    const tbody = document.getElementById('companies-table-body');
    if (!tbody) return;
    
    const filteredCompanies = companies.filter(company => {
        const matchesSearch = !searchTerm ||
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.deliveryArea.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = !statusFilter || company.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);
    
    tbody.innerHTML = paginatedCompanies.map(company => `
        <tr>
            <td>
                <input type="checkbox" value="${company.id}" onchange="handleCompanySelection(${company.id}, this.checked)">
            </td>
            <td>${company.id}</td>
            <td>${company.name}</td>
            <td>${company.businessName}</td>
            <td>${company.deliveryArea}</td>
            <td>
                <span class="status-badge status-${company.status}">
                    ${formatStatus(company.status)}
                </span>
            </td>
            <td>
                <button class="action-btn edit" onclick="editCompany(${company.id})" title="Edit Company">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    updatePagination(filteredCompanies.length);
}

function renderBusinessesTable() {
    const tbody = document.getElementById('businesses-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = businesses.map(business => `
        <tr>
            <td>${business.id}</td>
            <td>${business.name}</td>
            <td>${business.brn}</td>
            <td>
                <span class="status-badge ${business.insuranceType === 'intermediary-self' ? 'status-intermediary-self' : business.insuranceType?.includes('intermediary') ? 'status-operating' : 'status-preparing'}">
                    ${business.insuranceType === 'intermediary-self' ? 'Intermediary - Self Reporting' :
                      business.insuranceType === 'intermediary-ww' ? 'Intermediary - WW Reporting' :
                      business.insuranceType === 'single' ? 'Single Partner' :
                      business.type || 'Unknown'}
                </span>
            </td>
            <td>${business.companiesCount}</td>
            <td>
                <button class="action-btn edit" onclick="editBusiness('${business.id}')" title="Edit Business">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function populateBusinessOptions() {
    const select = document.getElementById('company-business');
    if (!select) return;

    // Count existing companies per business
    const businessCompanyCount = {};
    companies.forEach(company => {
        if (company.businessId) {
            businessCompanyCount[company.businessId] = (businessCompanyCount[company.businessId] || 0) + 1;
        }
    });

    select.innerHTML = '<option value="">Select Business</option>' +
        businesses.map(business => {
            const companyCount = businessCompanyCount[business.id] || 0;
            const isSinglePartner = business.insuranceType === 'single';
            const isDisabled = isSinglePartner && companyCount >= 1;
            const disabledAttr = isDisabled ? 'disabled' : '';
            const disabledText = isDisabled ? ' (Max 1 company reached)' : '';

            return `<option value="${business.id}" ${disabledAttr}>${business.name} (${business.id})${disabledText}</option>`;
        }).join('');
}

function updateBusinessInfo(businessId) {
    const selectedBusiness = businesses.find(b => b.id === businessId);
    const businessInfoDiv = document.getElementById('selected-business-info');
    const intermediarySection = document.getElementById('intermediary-business-info');
    const companyOwnerNameGroup = document.getElementById('company-owner-name-group');

    if (!selectedBusiness) {
        businessInfoDiv.style.display = 'none';
        intermediarySection.style.display = 'none';
        if (companyOwnerNameGroup) {
            companyOwnerNameGroup.style.display = 'none';
            document.getElementById('company-owner-name').required = false;
        }
        return;
    }

    // Hide business details display - we don't want to show this info
    businessInfoDiv.style.display = 'none';

    // Show intermediary business info section if it's Intermediary - WW reporting
    if (selectedBusiness.insuranceType === 'intermediary-ww') {
        intermediarySection.style.display = 'block';
        // Make these fields required
        document.getElementById('intermediary-business-name-mapping').required = true;
        document.getElementById('intermediary-registration-mapping').required = true;
        document.getElementById('intermediary-owner-mapping').required = true;
        document.getElementById('intermediary-opening-date-mapping').required = true;

        // Show and make Company Owner Name field required for intermediary WW
        if (companyOwnerNameGroup) {
            companyOwnerNameGroup.style.display = 'block';
            document.getElementById('company-owner-name').required = true;
        }
    } else {
        intermediarySection.style.display = 'none';
        // Remove required attribute
        document.getElementById('intermediary-business-name-mapping').required = false;
        document.getElementById('intermediary-registration-mapping').required = false;
        document.getElementById('intermediary-owner-mapping').required = false;
        document.getElementById('intermediary-opening-date-mapping').required = false;

        // Hide Company Owner Name field for non-intermediary WW businesses
        if (companyOwnerNameGroup) {
            companyOwnerNameGroup.style.display = 'none';
            document.getElementById('company-owner-name').required = false;
        }
    }
}

function handleSearch(e) {
    searchTerm = e.target.value;
    currentPage = 1;
    renderCompaniesTable();
}

function handleStatusFilter(value) {
    statusFilter = value;
    currentPage = 1;
    renderCompaniesTable();
}

function handleBusinessSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    // Implement business search logic here
    console.log('Searching businesses for:', searchTerm);
}

function handleCompanySelection(companyId, isSelected) {
    if (isSelected) {
        selectedCompanies.add(companyId);
    } else {
        selectedCompanies.delete(companyId);
    }
    updateBulkActionsVisibility();
}

function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('select-all');
    const companyCheckboxes = document.querySelectorAll('input[type="checkbox"][value]');
    
    companyCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
        handleCompanySelection(parseInt(checkbox.value), checkbox.checked);
    });
}

function updateBulkActionsVisibility() {
    const bulkActions = document.querySelector('.bulk-actions');
    if (bulkActions) {
        bulkActions.style.display = selectedCompanies.size > 1 ? 'flex' : 'none';
    }
}

function changePage(direction) {
    const totalPages = Math.ceil(companies.length / pageSize);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderCompaniesTable();
    }
}

function changePageSize(newSize) {
    pageSize = parseInt(newSize);
    currentPage = 1;
    renderCompaniesTable();
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize);
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
}

function formatStatus(status) {
    const statusMap = {
        'preparing': 'Preparing',
        'operating': 'Operating',
        'suspended': 'Suspended',
        'terminated': 'Terminated',
        'termination-requested': 'Termination Request'
    };
    return statusMap[status] || status;
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Special handling for bulk status modal
        if (modalId === 'bulk-status-modal') {
            showSelectedCompanies();
            initializeBulkStatusModal();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Clear forms
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

function showSelectedCompanies() {
    const container = document.getElementById('selected-companies');
    if (!container) return;

    if (selectedCompanies.size === 0) {
        container.innerHTML = '<p class="no-selection">No companies selected</p>';
        return;
    }

    const selectedCompaniesList = Array.from(selectedCompanies).map(id => {
        const company = companies.find(c => c.id === id);
        return company ? `
            <div class="company-chip">
                <span class="company-name">${company.name}</span>
                <span class="company-status status-${company.status}">${formatStatus(company.status)}</span>
                <button class="remove-chip" onclick="removeCompanyFromSelection('${id}')" title="Remove from selection">&times;</button>
            </div>
        ` : '';
    }).join('');

    container.innerHTML = `
        <div class="selection-header">
            <h4>Selected Companies (${selectedCompanies.size})</h4>
            <button class="clear-all-btn" onclick="clearAllSelection()" title="Clear all selections">Clear All</button>
        </div>
        <div class="companies-list">${selectedCompaniesList}</div>
    `;
}

function removeCompanyFromSelection(companyId) {
    selectedCompanies.delete(companyId);
    showSelectedCompanies();

    // Update checkbox in table
    const checkbox = document.querySelector(`input[value="${companyId}"]`);
    if (checkbox) {
        checkbox.checked = false;
    }

    updateBulkActionsVisibility();
}

function clearAllSelection() {
    selectedCompanies.clear();
    showSelectedCompanies();

    // Update all checkboxes in table
    const checkboxes = document.querySelectorAll('input[type="checkbox"][value]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Update select all checkbox
    const selectAllCheckbox = document.getElementById('select-all');
    if (selectAllCheckbox) {
        selectAllCheckbox.checked = false;
    }

    updateBulkActionsVisibility();
}

function initializeBulkStatusModal() {
    // Reset form
    const bulkStatusField = document.getElementById('bulk-status');
    if (bulkStatusField) bulkStatusField.value = '';

    // Add real-time validation
    const statusSelect = document.getElementById('bulk-status');
    const applyButton = document.querySelector('#bulk-status-modal .primary-btn');

    function validateForm() {
        const hasStatus = statusSelect.value !== '';

        if (applyButton && !applyButton.disabled) {
            applyButton.disabled = !hasStatus;
            applyButton.style.opacity = hasStatus ? '1' : '0.6';
        }
    }

    statusSelect.addEventListener('change', validateForm);

    // Initial validation
    validateForm();
}

// CRUD Operations
function handleCreatePartner(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newPartner = {
        id: Math.max(...partners.map(p => p.id)) + 1,
        name: document.getElementById('partner-name').value,
        businessId: document.getElementById('partner-business').value,
        businessName: businesses.find(b => b.id === document.getElementById('partner-business').value)?.name || '',
        deliveryArea: document.getElementById('partner-delivery-area').value,
        status: 'preparing',
        ceoEmail: document.getElementById('partner-ceo-email').value,
        createdAt: new Date().toISOString().split('T')[0],
        contractId: `CON${String(Math.max(...partners.map(p => parseInt(p.contractId.replace('CON', '')))) + 1).padStart(3, '0')}`
    };
    
    // Validate CEO email exists in Partner Center (simulation)
    if (!validateCEOEmail(newPartner.ceoEmail)) {
        showAlert('CEO email not found in Partner Center. Please ensure the CEO has registered.', 'error');
        return;
    }
    
    partners.push(newPartner);
    renderPartnersTable();
    closeModal('create-partner-modal');
    showAlert('Partner created successfully!', 'success');
    
    // Create contract (simulation)
    createContract(newPartner.id);
}

function handleCreateBusiness(e) {
    e.preventDefault();
    
    // Validate all mandatory fields and verifications before creating business
    const validationResult = validateBusinessForm();
    
    if (!validationResult.isValid) {
        console.log('Form validation failed:', validationResult.message);
        showAlert(validationResult.message, 'error');
        return;
    }
    
    console.log('Form validation passed, creating business...');
    
    // Generate next available business ID
    const existingIds = businesses.map(b => parseInt(b.id.replace('BUS', '')));
    const nextId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    
    const newBusiness = {
        id: `BUS${String(nextId).padStart(3, '0')}`,
        name: document.getElementById('business-name').value,
        brn: document.getElementById('business-brn').value,
        type: document.getElementById('business-type').value,
        insuranceType: document.getElementById('insurance-type').value,
        companiesCount: 0,
        bankName: document.getElementById('bank-name').value,
        bankNumber: document.getElementById('bank-number').value,
        accountHolder: document.getElementById('account-holder').value,
        ownerName: document.getElementById('owner-name').value,
        ownerPhone: document.getElementById('owner-phone').value,
        ownerBirthday: document.getElementById('owner-birthday').value,
        businessLocation: document.getElementById('business-location').value,
        headOfficeLocation: document.getElementById('head-office-location').value,
        openingDate: document.getElementById('business-opening-date').value,
        sapCode: generateSapCode({
            type: document.getElementById('insurance-type').value,
            region: 'Korea' // Default region, could be made dynamic
        }),
        brnVerified: true,
        bankVerified: true
    };
    
    businesses.unshift(newBusiness); // Add to the beginning of the array (top of list)
    saveBusinessesToLocalStorage(); // Save to localStorage
    console.log('Business created and added:', newBusiness);
    console.log('Total businesses now:', businesses.length);
    renderBusinessesTable();
    populateBusinessOptions();
    
    // Reset verification attempts for next use
    window.brnVerificationAttempts = 0;
    
    // Clear the form
    document.getElementById('create-business-form').reset();
    
    // Reset verification status displays
    updateVerificationStatus('brn-verification', 'pending', 'Enter BRN to verify');
    updateVerificationStatus('bank-verification', 'pending', 'Complete all bank information to verify');
    
    // Reset verify button
    const verifyButton = document.getElementById('verify-bank-btn');
    if (verifyButton) {
        verifyButton.disabled = false;
        verifyButton.innerHTML = '<i class="fas fa-check"></i> Verify Bank Account Information';
        verifyButton.style.background = '#6ba3f5';
    }
    
    // Navigate back to business list page
    showSection('business-list');
    
    // Show success message with SAP code after navigation
    setTimeout(() => {
        showAlert(`Business created successfully! SAP Code: ${newBusiness.sapCode}`, 'success');
    }, 100);
}

function handleCreateCompany(e) {
    e.preventDefault();
    
    // Validate company form including conditional intermediary fields
    const validationResult = validateCompanyForm();
    
    if (!validationResult.isValid) {
        console.log('Company form validation failed:', validationResult.message);
        showAlert(validationResult.message, 'error');
        return;
    }
    
    console.log('Company form validation passed, creating company...');
    
    const formData = new FormData(e.target);
    const selectedBusiness = businesses.find(b => b.id === document.getElementById('company-business').value);
    
    // Generate next available company ID
    const existingCompanyIds = companies.map(c => c.id);
    const nextCompanyId = existingCompanyIds.length > 0 ? Math.max(...existingCompanyIds) + 1 : 1;
    
    const newCompany = {
        id: nextCompanyId,
        name: document.getElementById('company-name').value,
        phone: document.getElementById('company-phone').value,
        address: document.getElementById('company-address').value,
        businessId: document.getElementById('company-business').value,
        businessName: selectedBusiness?.name || '',
        deliveryArea: document.getElementById('company-delivery-zone').value,
        status: 'preparing',
        adminName: document.getElementById('company-admin-name').value,
        adminPhone: document.getElementById('company-admin-phone').value,
        adminId: document.getElementById('company-admin-id').value,
        companyOwnerName: document.getElementById('company-owner-name').value,
        createdAt: new Date().toISOString().split('T')[0],
        contractId: `CON${String(nextCompanyId).padStart(3, '0')}`
    };
    
    // Add intermediary business information if applicable
    if (selectedBusiness?.insuranceType === 'intermediary-ww') {
        newCompany.intermediaryBusinessInfo = {
            businessName: document.getElementById('intermediary-business-name-mapping').value,
            registrationNumber: document.getElementById('intermediary-registration-mapping').value,
            ownerName: document.getElementById('intermediary-owner-mapping').value,
            openingDate: document.getElementById('intermediary-opening-date-mapping').value
        };
    }
    
    
    companies.unshift(newCompany); // Add to the beginning of the array (top of list)
    saveCompaniesToLocalStorage(); // Save to localStorage
    
    // Update the business's company count
    const business = businesses.find(b => b.id === newCompany.businessId);
    if (business) {
        business.companiesCount = companies.filter(c => c.businessId === business.id).length;
        saveBusinessesToLocalStorage(); // Save updated business count
    }
    
    console.log('Company created and added:', newCompany);
    console.log('Total companies now:', companies.length);
    renderCompaniesTable();

    // Refresh business dropdown to update disabled states for Single Partner businesses
    populateBusinessOptions();
    renderBusinessesTable(); // Update business table to show new company count
    
    // Clear the form
    document.getElementById('create-company-form').reset();
    
    
    // Create contract (simulation)
    createContract(newCompany.id);
    
    // Navigate back to company list page
    // Navigate to company list/management page
    showSection('company-list');
    
    // Show success message with contract info after navigation
    setTimeout(() => {
        showAlert(`Company created successfully! Contract ID: ${newCompany.contractId}`, 'success');
    }, 100);
}

// Comprehensive form validation function
function validateBusinessForm() {
    const requiredFields = [
        { id: 'business-name', label: 'Business Name' },
        { id: 'business-brn', label: 'Business Registration Number' },
        { id: 'business-type', label: 'Business Type' },
        { id: 'bank-name', label: 'Bank Name' },
        { id: 'bank-number', label: 'Bank Account Number' },
        { id: 'account-holder', label: 'Account Holder Name' },
        { id: 'owner-name', label: 'Owner Name' },
        { id: 'owner-phone', label: 'Owner Phone' },
        { id: 'owner-birthday', label: 'Owner Birthday' },
        { id: 'business-location', label: 'Business Location' },
        { id: 'head-office-location', label: 'Head Office Location' },
        { id: 'business-opening-date', label: 'Business Opening Date' }
    ];
    
    // Check all required fields are filled
    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (!element || !element.value.trim()) {
            return {
                isValid: false,
                message: `Please fill in the required field: ${field.label}`
            };
        }
    }
    
    // Check BRN verification status
    const brnVerification = document.getElementById('brn-verification');
    console.log('BRN verification element:', brnVerification);
    console.log('BRN has verified class:', brnVerification?.classList.contains('verified'));
    if (!brnVerification || !brnVerification.classList.contains('verified')) {
        return {
            isValid: false,
            message: 'BRN verification must be completed successfully before creating business'
        };
    }
    
    // Check Bank verification status  
    const bankVerification = document.getElementById('bank-verification');
    console.log('Bank verification element:', bankVerification);
    console.log('Bank has verified class:', bankVerification?.classList.contains('verified'));
    if (!bankVerification || !bankVerification.classList.contains('verified')) {
        return {
            isValid: false,
            message: 'Bank account verification must be completed successfully before creating business'
        };
    }
    
    // Check tax document upload if required
    const taxDocInput = document.getElementById('tax-document');
    if (taxDocInput && taxDocInput.required && (!taxDocInput.files || taxDocInput.files.length === 0)) {
        return {
            isValid: false,
            message: 'Tax document must be uploaded'
        };
    }
    
    // Intermediary business validation removed - this is now handled in Company form only
    
    return { isValid: true };
}

// Company form validation function
function validateCompanyForm() {
    const requiredFields = [
        { id: 'company-name', label: 'Company Name' },
        { id: 'company-phone', label: 'Company Phone' },
        { id: 'company-address', label: 'Company Address' },
        { id: 'company-delivery-zone', label: 'Delivery Zone' },
        { id: 'company-business', label: 'Business ID' },
        { id: 'company-admin-name', label: 'Admin Name' },
        { id: 'company-admin-phone', label: 'Admin Phone Number' },
        { id: 'company-admin-id', label: 'Admin ID' }
    ];
    
    // Check all required fields are filled
    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        console.log(`Checking field ${field.id}:`, element?.value, 'Required:', element?.required);
        if (element && element.required && !element.value.trim()) {
            return {
                isValid: false,
                message: `Please fill in the required field: ${field.label}`
            };
        }
    }

    // Check if selected business is a Single Partner with maximum companies reached
    const selectedBusinessId = document.getElementById('company-business').value;
    const selectedBusiness = businesses.find(b => b.id === selectedBusinessId);

    if (selectedBusiness && selectedBusiness.insuranceType === 'single') {
        const existingCompaniesCount = companies.filter(c => c.businessId === selectedBusinessId).length;
        if (existingCompaniesCount >= 1) {
            return {
                isValid: false,
                message: `Cannot create company for business "${selectedBusiness.name}". Single Partner businesses can only have one company mapped to them.`
            };
        }
    }

    // Check if intermediary business info is required and complete
    
    if (selectedBusiness && selectedBusiness.insuranceType === 'intermediary-ww') {
        const intermediaryFields = [
            { id: 'company-owner-name', label: 'Company Owner Name' },
            { id: 'intermediary-business-name-mapping', label: 'Intermediary Business Name' },
            { id: 'intermediary-registration-mapping', label: 'Intermediary Registration Number' },
            { id: 'intermediary-owner-mapping', label: 'Intermediary Owner Name' },
            { id: 'intermediary-opening-date-mapping', label: 'Intermediary Opening Date' }
        ];
        
        for (const field of intermediaryFields) {
            const element = document.getElementById(field.id);
            if (element && element.required && !element.value.trim()) {
                return {
                    isValid: false,
                    message: `Please fill in the required intermediary field: ${field.label}`
                };
            }
        }

        // Check if registration number is verified
        const registrationStatus = document.getElementById('registration-verification');
        const isRegistrationVerified = registrationStatus && registrationStatus.classList.contains('verified');

        if (!isRegistrationVerified) {
            return {
                isValid: false,
                message: 'Please verify the intermediary business registration number before creating the company'
            };
        }
    }
    
    
    return { isValid: true };
}

// Update submit button state based on form validity
function updateSubmitButtonState() {
    const submitButton = document.querySelector('#create-business-modal .primary-btn');
    if (!submitButton) return;
    
    const validationResult = validateBusinessForm();
    
    if (validationResult.isValid) {
        submitButton.disabled = false;
        submitButton.classList.remove('disabled');
        submitButton.textContent = 'Create Business';
        submitButton.title = '';
    } else {
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
        submitButton.textContent = 'Complete Required Fields & Verification';
        submitButton.title = validationResult.message;
    }
}

// Add real-time form validation
function initializeFormValidation() {
    const form = document.getElementById('create-business-form');
    if (!form) return;
    
    // Add event listeners to all form fields
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('input', updateSubmitButtonState);
        field.addEventListener('change', updateSubmitButtonState);
    });
    
    // Add event listeners for BRN and Bank inputs to trigger verification
    const brnInput = document.getElementById('business-brn');
    if (brnInput) {
        brnInput.addEventListener('input', function() {
            // Reset verification attempts when user modifies BRN field
            if (window.brnVerificationAttempts > 0) {
                window.brnVerificationAttempts = 0;
                updateVerificationStatus('brn-verification', 'pending', 'Enter BRN to verify');
                updateSubmitButtonState();
            }
        });
        
        brnInput.addEventListener('blur', function() {
            if (this.value.trim()) {
                verifyBRN(this.value);
            }
        });
    }
    
    // Add event listeners for all bank fields to trigger verification
    const bankFields = ['bank-name', 'bank-number', 'account-holder'];
    bankFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                // Check if all bank fields have values before triggering verification
                const allBankFields = bankFields.map(id => document.getElementById(id));
                const allFilled = allBankFields.every(f => f && f.value.trim());
                
                if (allFilled) {
                    verifyBankAccount();
                } else {
                    // Reset verification status if not all fields are filled
                    updateVerificationStatus('bank-verification', 'pending', 'Complete all bank information to verify');
                    updateSubmitButtonState();
                }
            });
        }
    });
    
    // Add manual verification button for bank information
    const bankVerifyButton = document.getElementById('verify-bank-btn');
    if (bankVerifyButton) {
        bankVerifyButton.addEventListener('click', function() {
            verifyBankAccount();
        });
    }
    
    // Initial button state check
    updateSubmitButtonState();
    
    // Insurance type change listener removed - intermediary logic is now only in Company form
    
    // Add event listener for Admin ID input to reset verification
    const adminIdInput = document.getElementById('company-admin-id');
    if (adminIdInput) {
        adminIdInput.addEventListener('input', function() {
            // Reset verification attempts when user modifies admin ID field
            if (window.adminVerificationAttempts > 0) {
                window.adminVerificationAttempts = 0;
                updateVerificationStatus('admin-verification', 'pending', 'Admin must have existing Partner Centre account');
                const verifyButton = document.getElementById('verify-admin-btn');
                if (verifyButton) {
                    verifyButton.disabled = false;
                    verifyButton.innerHTML = '<i class="fas fa-check"></i> Verify with Partner Centre';
                    verifyButton.style.background = '';
                }
            }
        });
    }

    // Add event listener for intermediary registration field
    const registrationField = document.getElementById('intermediary-registration-mapping');
    if (registrationField) {
        registrationField.addEventListener('input', function() {
            // Reset registration verification attempts when user modifies field
            if (window.registrationVerificationAttempts > 0) {
                window.registrationVerificationAttempts = 0;
                updateVerificationStatus('registration-verification', 'pending', 'Press Enter or click Verify to validate registration number');
                const verifyButton = document.getElementById('verify-registration-btn');
                if (verifyButton) {
                    verifyButton.disabled = false;
                    verifyButton.innerHTML = '<i class="fas fa-check"></i> Verify';
                    verifyButton.style.background = '';
                }
                updateSubmitButtonState();
            }
        });
    }
}

function simulateVerification(business) {
    // Simulate BRN verification
    setTimeout(() => {
        console.log('BRN verification completed for business:', business.id);
    }, 2000);

    // Simulate bank verification
    setTimeout(() => {
        console.log('Bank verification completed for business:', business.id);
    }, 3000);
}


function applyBulkStatus() {
    const bulkStatusField = document.getElementById('bulk-status');
    const newStatus = bulkStatusField ? bulkStatusField.value : '';

    if (!newStatus) {
        showAlert('Please select a status', 'error');
        return;
    }

    // Show loading state
    const applyButton = document.querySelector('#bulk-status-modal .primary-btn');
    const originalButtonText = applyButton.innerHTML;
    applyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Applying Changes...';
    applyButton.disabled = true;

    // Validate status transitions
    const invalidTransitions = [];
    selectedCompanies.forEach(companyId => {
        const company = companies.find(c => c.id === companyId);
        if (company && !isValidStatusTransition(company.status, newStatus)) {
            invalidTransitions.push(`${company.name}: ${formatStatus(company.status)} → ${formatStatus(newStatus)}`);
        }
    });

    if (invalidTransitions.length > 0) {
        showAlert(`Invalid status transitions:\n${invalidTransitions.join('\n')}`, 'error');
        // Reset button
        applyButton.innerHTML = originalButtonText;
        applyButton.disabled = false;
        return;
    }

    // Apply status change
    setTimeout(() => {
        let updatedCount = 0;
        selectedCompanies.forEach(companyId => {
            const company = companies.find(c => c.id === companyId);
            if (company) {
                company.status = newStatus;
                company.statusChangedAt = new Date().toISOString();
                updatedCount++;
            }
        });

        renderCompaniesTable();
        selectedCompanies.clear();
        document.getElementById('select-all').checked = false;
        updateBulkActionsVisibility();
        closeModal('bulk-status-modal');

        // Reset form
        const resetBulkStatusField = document.getElementById('bulk-status');
        if (resetBulkStatusField) resetBulkStatusField.value = '';

        showAlert(`Status updated for ${updatedCount} company/companies`, 'success');

        // Reset button
        applyButton.innerHTML = originalButtonText;
        applyButton.disabled = false;
    }, 1000); // Simulate API call delay
}

function isValidStatusTransition(currentStatus, newStatus) {
    const validTransitions = {
        'preparing': ['operating', 'terminated'],
        'operating': ['suspended', 'termination-requested'],
        'suspended': ['operating', 'termination-requested'],
        'termination-requested': ['terminated'],
        'terminated': [] // Cannot transition from terminated
    };
    
    return validTransitions[currentStatus]?.includes(newStatus) || false;
}

// Utility Functions

// Simple validateCEOEmail for backward compatibility with partner creation
function validateCEOEmail(email) {
    // Basic email validation
    return email && email.includes('@') && email.length > 5;
}

function createContract(partnerId) {
    // Simulate contract creation
    console.log(`Contract created for partner ${partnerId}`);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showAlert('Email copied to clipboard', 'success');
    }).catch(() => {
        showAlert('Failed to copy email', 'error');
    });
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insert at the top of the main content
    const mainContent = document.querySelector('.main-content');
    mainContent.insertBefore(alertDiv, mainContent.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Handle BRN field changes - only show re-verify if actually changed
function handleBRNChange(value) {
    const brnInput = document.getElementById('detail-business-brn');
    const originalValue = brnInput.dataset.originalValue;
    const verification = document.getElementById('detail-brn-verification');
    const button = document.getElementById('detail-verify-brn-btn');
    
    if (verification && button) {
        if (value !== originalValue) {
            // Value changed - show re-verification needed
            verification.className = 'verification-status pending';
            verification.innerHTML = '<i class="fas fa-clock"></i> BRN changed - verification required';
            button.style.display = 'block';
        } else {
            // Value restored to original - hide re-verification
            verification.className = 'verification-status verified';
            verification.innerHTML = '<i class="fas fa-check-circle"></i> BRN Verified';
            button.style.display = 'none';
        }
    }
}

// Handle Bank Info field changes - only show re-verify if any field actually changed
function handleBankInfoChange() {
    const bankNameInput = document.getElementById('detail-bank-name');
    const bankNumberInput = document.getElementById('detail-bank-number');
    const accountHolderInput = document.getElementById('detail-account-holder');
    
    const bankNameOriginal = bankNameInput.dataset.originalValue;
    const bankNumberOriginal = bankNumberInput.dataset.originalValue;
    const accountHolderOriginal = accountHolderInput.dataset.originalValue;
    
    const verification = document.getElementById('detail-bank-verification');
    const button = document.getElementById('detail-verify-bank-btn');
    
    if (verification && button) {
        // Check if any bank field has changed
        const hasChanges = 
            bankNameInput.value !== bankNameOriginal ||
            bankNumberInput.value !== bankNumberOriginal ||
            accountHolderInput.value !== accountHolderOriginal;
        
        if (hasChanges) {
            // Values changed - show re-verification needed
            verification.className = 'verification-status pending';
            verification.innerHTML = '<i class="fas fa-clock"></i> Bank information changed - re-verification required';
            button.style.display = 'block';
        } else {
            // All values restored to original - hide re-verification
            verification.className = 'verification-status verified';
            verification.innerHTML = '<i class="fas fa-check-circle"></i> Bank Account Information Verified';
            button.style.display = 'none';
        }
    }
}

// Re-verify BRN in details page
function verifyDetailBRN(brn) {
    if (!brn) {
        showAlert('Please enter a BRN to verify', 'error');
        return;
    }
    
    const verification = document.getElementById('detail-brn-verification');
    const button = document.getElementById('detail-verify-brn-btn');
    
    // Show loading state
    verification.className = 'verification-status pending';
    verification.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying BRN...';
    button.disabled = true;
    
    // Simulate verification (always succeeds for prototype)
    setTimeout(() => {
        verification.className = 'verification-status verified';
        verification.innerHTML = '<i class="fas fa-check-circle"></i> BRN Re-verified';
        button.disabled = false;
        button.style.display = 'none';
        showAlert('BRN successfully re-verified', 'success');
    }, 2000);
}

// Re-verify Bank Account in details page
function verifyDetailBankAccount() {
    const bankName = document.getElementById('detail-bank-name').value;
    const bankNumber = document.getElementById('detail-bank-number').value;
    const accountHolder = document.getElementById('detail-account-holder').value;
    
    if (!bankName || !bankNumber || !accountHolder) {
        showAlert('Please fill in all bank information fields to verify', 'error');
        return;
    }
    
    const verification = document.getElementById('detail-bank-verification');
    const button = document.getElementById('detail-verify-bank-btn');
    
    // Show loading state
    verification.className = 'verification-status pending';
    verification.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying bank account information...';
    button.disabled = true;
    
    // Simulate verification (always succeeds for prototype)
    setTimeout(() => {
        verification.className = 'verification-status verified';
        verification.innerHTML = '<i class="fas fa-check-circle"></i> Bank Account Information Re-verified';
        button.disabled = false;
        button.style.display = 'none';
        showAlert('Bank account information successfully re-verified', 'success');
    }, 2000);
}

// Handle tax document upload during business registration
function handleTaxDocumentUpload(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];

        // Simulate document upload and generate sharable link
        const sharableLink = generateTaxDocumentShareableLink(file.name);

        // Show the sharable link container
        const linkContainer = document.getElementById('tax-document-link-container');
        const linkUrl = document.getElementById('tax-document-link-url');

        if (linkContainer && linkUrl) {
            linkUrl.textContent = sharableLink;
            linkContainer.style.display = 'block';
            showAlert(`Tax document "${file.name}" uploaded successfully. Sharable link generated.`, 'success');
        }
    }
}

// Handle tax document changes in business details
function handleTaxDocumentChange(input) {
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const taxDocumentName = document.getElementById('detail-tax-document-name');

        if (taxDocumentName) {
            taxDocumentName.textContent = file.name;

            // Generate new sharable link for the updated document
            const newSharableLink = generateTaxDocumentShareableLink(file.name);
            const linkUrl = document.getElementById('detail-tax-document-link-url');

            if (linkUrl) {
                linkUrl.textContent = newSharableLink;
            }

            showAlert(`New tax document "${file.name}" selected for upload. New sharable link generated.`, 'success');
        }
    }
}

// Generate a sharable link for tax documents
function generateTaxDocumentShareableLink(fileName) {
    // In a real implementation, this would call an API to upload the document and get a secure sharable link
    // For now, we'll generate a mock link with a unique identifier
    const uniqueId = generateUniqueId();
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    return `https://3pl-docs.hungerstation.com/tax-documents/share/${uniqueId}/${sanitizedFileName}`;
}

// Generate unique ID for document links
function generateUniqueId() {
    return 'doc_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
}

// Copy tax document link to clipboard (for new registrations)
function copyTaxDocumentLink() {
    const linkUrl = document.getElementById('tax-document-link-url');
    if (linkUrl) {
        copyToClipboard(linkUrl.textContent);
        showAlert('Tax document sharable link copied to clipboard', 'success');
    }
}

// Copy existing tax document link to clipboard
function copyExistingTaxDocumentLink() {
    const linkUrl = document.getElementById('detail-tax-document-link-url');
    if (linkUrl) {
        copyToClipboard(linkUrl.textContent);
        showAlert('Tax document sharable link copied to clipboard', 'success');
    }
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}

// Fallback method for copying to clipboard
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        console.log('Fallback: Text copied to clipboard');
    } catch (err) {
        console.error('Fallback: Failed to copy text: ', err);
    }

    document.body.removeChild(textArea);
}

// View tax document (prototype)
function viewTaxDocument() {
    const documentName = document.getElementById('detail-tax-document-name').textContent;
    showAlert(`Opening tax document: ${documentName}`, 'info');
    // In a real implementation, this would open/download the document
}

// View company contract (prototype)
function viewCompanyContract() {
    const contractName = document.getElementById('detail-contract-name').textContent;
    showAlert(`Downloading contract: ${contractName}`, 'info');
    // In a real implementation, this would download the contract document
}

// Handle company status changes - require confirmation for critical changes
function handleCompanyStatusChange(newStatus) {
    const statusSelect = document.getElementById('detail-company-status-header');
    const originalStatus = statusSelect.dataset.originalValue;
    const confirmation = document.getElementById('status-change-confirmation');
    const statusChangeText = document.getElementById('status-change-text');
    
    if (newStatus === originalStatus) {
        // Status restored to original - hide confirmation
        confirmation.style.display = 'none';
        return;
    }
    
    if (newStatus === '') {
        // No status selected - hide confirmation
        confirmation.style.display = 'none';
        return;
    }
    
    // Show confirmation for status change
    const statusMessages = {
        'preparing': 'Company will be set to Preparing status. Operations may be limited.',
        'active': 'Company will be set to Active status. Full operations will be enabled.',
        'suspended': 'Company will be suspended. All operations will be halted.',
        'terminated': 'Company will be terminated. This action has serious consequences.',
        'under-review': 'Company will be placed under review. Some operations may be restricted.'
    };
    
    const urgencyLevels = {
        'preparing': 'normal',
        'active': 'positive',
        'suspended': 'warning',
        'terminated': 'critical',
        'under-review': 'warning'
    };
    
    statusChangeText.textContent = statusMessages[newStatus] || 'Status will be changed.';
    confirmation.className = `status-change-confirmation ${urgencyLevels[newStatus]}`;
    confirmation.style.display = 'block';
    
    // Store the pending status change
    window.pendingStatusChange = {
        newStatus: newStatus,
        originalStatus: originalStatus
    };
}

// Confirm status change
function confirmStatusChange() {
    const pendingChange = window.pendingStatusChange;
    if (!pendingChange) return;
    
    const statusSelect = document.getElementById('detail-company-status-header');
    const confirmation = document.getElementById('status-change-confirmation');
    
    // Update the original value to the new status
    statusSelect.dataset.originalValue = pendingChange.newStatus;
    
    // Hide confirmation
    confirmation.style.display = 'none';
    
    // Show success message based on status
    const statusName = formatStatus(pendingChange.newStatus);
    showAlert(`Company status successfully changed to: ${statusName}`, 'success');
    
    // Clear pending change
    window.pendingStatusChange = null;
}

// Cancel status change
function cancelStatusChange() {
    const pendingChange = window.pendingStatusChange;
    if (!pendingChange) return;
    
    const statusSelect = document.getElementById('detail-company-status-header');
    const confirmation = document.getElementById('status-change-confirmation');
    
    // Revert to original status
    statusSelect.value = pendingChange.originalStatus;
    
    // Hide confirmation
    confirmation.style.display = 'none';
    
    // Show cancellation message
    showAlert('Status change cancelled', 'info');
    
    // Clear pending change
    window.pendingStatusChange = null;
}

// Action Functions
function editPartner(partnerId) {
    const partner = partners.find(p => p.id === partnerId);
    if (partner) {
        // Populate edit form with partner data
        const partnerNameField = document.getElementById('partner-name');
        const partnerBusinessField = document.getElementById('partner-business');
        const partnerDeliveryAreaField = document.getElementById('partner-delivery-area');
        const partnerCeoEmailField = document.getElementById('partner-ceo-email');

        if (partnerNameField) partnerNameField.value = partner.name;
        if (partnerBusinessField) partnerBusinessField.value = partner.businessId;
        if (partnerDeliveryAreaField) partnerDeliveryAreaField.value = partner.deliveryArea;
        if (partnerCeoEmailField) partnerCeoEmailField.value = partner.ceoEmail;
        
        openModal('create-partner-modal');
        
        // Change form title and button text
        document.querySelector('#create-partner-modal .modal-header h2').textContent = 'Edit Partner';
        document.querySelector('#create-partner-modal .primary-btn').innerHTML = '<i class="fas fa-save"></i> Update Partner';
    }
}

function viewPartnerDetails(partnerId) {
    const partner = partners.find(p => p.id === partnerId);
    if (partner) {
        // Create details modal (could be implemented as a separate modal)
        console.log('Viewing partner details:', partner);
        showAlert(`Partner Details: ${partner.name} - ${partner.status}`, 'info');
    }
}

function deletePartner(partnerId) {
    if (confirm('Are you sure you want to delete this partner?')) {
        partners = partners.filter(p => p.id !== partnerId);
        renderPartnersTable();
        showAlert('Partner deleted successfully', 'success');
    }
}

function editBusiness(businessId) {
    const business = businesses.find(b => b.id === businessId);
    if (business) {
        // Update page title
        document.getElementById('business-details-title').textContent = `${business.name} - Business Details`;
        
        // Basic Business Information
        const detailBusinessNameField = document.getElementById('detail-business-name');
        const detailOpeningDateField = document.getElementById('detail-business-opening-date');
        const detailLocationField = document.getElementById('detail-business-location');
        const detailHeadOfficeField = document.getElementById('detail-head-office-location');

        if (detailBusinessNameField) detailBusinessNameField.value = business.name;
        if (detailOpeningDateField) detailOpeningDateField.value = business.openingDate || business.createdAt || new Date().toISOString().split('T')[0];
        if (detailLocationField) detailLocationField.value = business.location || '';
        if (detailHeadOfficeField) detailHeadOfficeField.value = business.headOfficeLocation || '';
        
        // Business Registration & Verification
        const brnInput = document.getElementById('detail-business-brn');
        if (brnInput) {
            brnInput.value = business.brn;
            // Store original value to detect changes
            brnInput.dataset.originalValue = business.brn;
        }
        
        // Update BRN verification status display
        const brnVerification = document.getElementById('detail-brn-verification');
        if (brnVerification) {
            brnVerification.className = 'verification-status verified';
            brnVerification.innerHTML = '<i class="fas fa-check-circle"></i> BRN Verified';
        }
        
        // Hide BRN re-verify button initially
        const brnButton = document.getElementById('detail-verify-brn-btn');
        if (brnButton) brnButton.style.display = 'none';
        
        // Tax Document - show current document
        const taxDocumentName = document.getElementById('detail-tax-document-name');
        if (taxDocumentName) {
            // For prototype, generate a realistic filename based on business
            const filename = `${business.name.replace(/\s+/g, '_').toLowerCase()}_tax_registration_2024.pdf`;
            taxDocumentName.textContent = filename;
        }
        
        // Bank Account Information
        const bankNameInput = document.getElementById('detail-bank-name');
        const bankNumberInput = document.getElementById('detail-bank-number');
        const accountHolderInput = document.getElementById('detail-account-holder');

        if (bankNameInput) {
            bankNameInput.value = business.bankName || '';
            // Store original values to detect changes
            bankNameInput.dataset.originalValue = business.bankName || '';
        }
        if (bankNumberInput) {
            bankNumberInput.value = business.bankNumber || '';
            bankNumberInput.dataset.originalValue = business.bankNumber || '';
        }
        if (accountHolderInput) {
            accountHolderInput.value = business.accountHolder || '';
            accountHolderInput.dataset.originalValue = business.accountHolder || '';
        }
        
        // Update Bank verification status display
        const bankVerification = document.getElementById('detail-bank-verification');
        if (bankVerification) {
            bankVerification.className = 'verification-status verified';
            bankVerification.innerHTML = '<i class="fas fa-check-circle"></i> Bank Account Information Verified';
        }
        
        // Hide Bank re-verify button initially
        const bankButton = document.getElementById('detail-verify-bank-btn');
        if (bankButton) bankButton.style.display = 'none';
        
        // Business Owner Information
        const detailOwnerNameField = document.getElementById('detail-owner-name');
        const detailOwnerPhoneField = document.getElementById('detail-owner-phone');
        const detailOwnerBirthdayField = document.getElementById('detail-owner-birthday');

        if (detailOwnerNameField) detailOwnerNameField.value = business.ownerName || '';
        if (detailOwnerPhoneField) detailOwnerPhoneField.value = business.ownerPhone || '';
        if (detailOwnerBirthdayField) detailOwnerBirthdayField.value = business.ownerBirthday || '';

        // Business Type & Insurance
        const detailBusinessTypeField = document.getElementById('detail-business-type');
        const detailInsuranceTypeField = document.getElementById('detail-insurance-type');

        if (detailBusinessTypeField) detailBusinessTypeField.value = business.type || '';
        if (detailInsuranceTypeField) detailInsuranceTypeField.value = business.insuranceType || '';

        // System Information
        const detailBusinessIdField = document.getElementById('detail-business-id');
        const detailSapCodeField = document.getElementById('detail-sap-code');
        const detailCompaniesCountField = document.getElementById('detail-companies-count');
        const detailBusinessCreatedDateField = document.getElementById('detail-created-date');

        if (detailBusinessIdField) detailBusinessIdField.value = business.id;
        if (detailSapCodeField) detailSapCodeField.value = business.sapCode || '';
        if (detailCompaniesCountField) detailCompaniesCountField.value = business.companiesCount || 0;
        if (detailBusinessCreatedDateField) detailBusinessCreatedDateField.value = business.createdAt || new Date().toISOString().split('T')[0];

        // Store the business ID for updating
        const businessDetailsForm = document.getElementById('business-details-form');
        if (businessDetailsForm) businessDetailsForm.dataset.businessId = businessId;
        
        // Navigate to details section
        showSection('business-details');
    }
}

function editCompany(companyId) {
    const company = companies.find(c => c.id === companyId);
    if (company) {
        // Update page title
        document.getElementById('company-details-title').textContent = `${company.name} - Company Details`;
        
        // Find associated business
        const associatedBusiness = businesses.find(b => b.id === company.businessId);
        
        // Populate detail form with all company data using the creation form structure
        const detailNameField = document.getElementById('detail-company-name');
        const detailPhoneField = document.getElementById('detail-company-phone');
        const detailAddressField = document.getElementById('detail-company-address');
        const detailInsuranceField = document.getElementById('detail-company-insurance');
        const detailDeliveryZoneField = document.getElementById('detail-company-delivery-zone');

        if (detailNameField) detailNameField.value = company.name;
        if (detailPhoneField) detailPhoneField.value = company.phone || '';
        if (detailAddressField) detailAddressField.value = company.address || '';
        if (detailInsuranceField) detailInsuranceField.value = company.insurance || '';
        if (detailDeliveryZoneField) detailDeliveryZoneField.value = company.deliveryArea || '';

        // Business Mapping
        const detailBusinessField = document.getElementById('detail-company-business');
        const detailBusinessNameField = document.getElementById('detail-company-business-name');

        if (detailBusinessField) detailBusinessField.value = company.businessId || '';
        if (detailBusinessNameField) detailBusinessNameField.value = company.businessName || (associatedBusiness ? associatedBusiness.name : '');

        // Show Company Owner Name field for intermediary WW businesses
        const detailOwnerNameRow = document.getElementById('detail-company-owner-name-row');
        const detailOwnerNameField = document.getElementById('detail-company-owner-name');

        if (associatedBusiness && associatedBusiness.insuranceType === 'intermediary-ww') {
            if (detailOwnerNameRow) {
                detailOwnerNameRow.style.display = 'block';
                if (detailOwnerNameField) detailOwnerNameField.value = company.companyOwnerName || '';
            }
        } else {
            if (detailOwnerNameRow) {
                detailOwnerNameRow.style.display = 'none';
            }
        }
        
        // Show intermediary section if applicable
        const intermediarySection = document.getElementById('detail-intermediary-business-info');
        if (company.intermediaryBusinessInfo) {
            if (intermediarySection) intermediarySection.style.display = 'block';

            const intermBusinessNameField = document.getElementById('detail-intermediary-business-name');
            const intermRegistrationField = document.getElementById('detail-intermediary-registration');
            const intermOwnerField = document.getElementById('detail-intermediary-owner');
            const intermOpeningDateField = document.getElementById('detail-intermediary-opening-date');

            if (intermBusinessNameField) intermBusinessNameField.value = company.intermediaryBusinessInfo.businessName || '';
            if (intermRegistrationField) intermRegistrationField.value = company.intermediaryBusinessInfo.registrationNumber || '';
            if (intermOwnerField) intermOwnerField.value = company.intermediaryBusinessInfo.ownerName || '';
            if (intermOpeningDateField) intermOpeningDateField.value = company.intermediaryBusinessInfo.openingDate || '';
        } else {
            if (intermediarySection) intermediarySection.style.display = 'none';
        }
        
        // Company Admin Integration
        const adminNameField = document.getElementById('detail-company-admin-name');
        const adminPhoneField = document.getElementById('detail-company-admin-phone');
        const adminIdField = document.getElementById('detail-company-admin-id');

        if (adminNameField) adminNameField.value = company.adminName || '';
        if (adminPhoneField) adminPhoneField.value = company.adminPhone || '';
        if (adminIdField) adminIdField.value = company.adminId || '';
        
        // Company Status Management - Header Dropdown
        const statusSelect = document.getElementById('detail-company-status-header');
        if (statusSelect) {
            statusSelect.value = company.status || '';
            // Store original status to track changes
            statusSelect.dataset.originalValue = company.status || '';
        }

        // Contract & System Information
        const contractName = document.getElementById('detail-contract-name');
        if (contractName) {
            // Generate realistic contract filename
            const filename = `Service_Agreement_${company.contractId || 'CON001'}.pdf`;
            contractName.textContent = filename;
        }

        const detailCompanyIdField = document.getElementById('detail-company-id');
        const detailContractIdField = document.getElementById('detail-company-contract');
        const detailCreatedDateField = document.getElementById('detail-company-created-date');

        if (detailCompanyIdField) detailCompanyIdField.value = company.id;
        if (detailContractIdField) detailContractIdField.value = company.contractId || '';
        if (detailCreatedDateField) detailCreatedDateField.value = company.createdAt || '';
        
        // Store the company ID for updating
        const companyDetailsForm = document.getElementById('company-details-form');
        if (companyDetailsForm) companyDetailsForm.dataset.companyId = companyId;
        
        // Reset status change confirmation
        const confirmation = document.getElementById('status-change-confirmation');
        if (confirmation) confirmation.style.display = 'none';
        
        // Navigate to details section
        showSection('company-details');
    }
}

function handleUpdateBusiness(e) {
    e.preventDefault();
    
    const businessId = document.getElementById('business-details-form').dataset.businessId;
    const business = businesses.find(b => b.id === businessId);
    
    if (business) {
        // Update business with new values (all editable fields)
        business.name = document.getElementById('detail-business-name').value;
        business.openingDate = document.getElementById('detail-business-opening-date').value;
        business.location = document.getElementById('detail-business-location').value;
        business.headOfficeLocation = document.getElementById('detail-head-office-location').value;
        
        // Business Registration & Verification (can be changed but need re-verification)
        business.brn = document.getElementById('detail-business-brn').value;
        // Tax document changes would be handled separately
        
        // Bank Account Information (all can be changed)
        business.bankName = document.getElementById('detail-bank-name').value;
        business.bankNumber = document.getElementById('detail-bank-number').value;
        business.accountHolder = document.getElementById('detail-account-holder').value;
        
        // Business Owner Information
        business.ownerName = document.getElementById('detail-owner-name').value;
        business.ownerPhone = document.getElementById('detail-owner-phone').value;
        business.ownerBirthday = document.getElementById('detail-owner-birthday').value;
        
        // Business Type & Insurance
        business.type = document.getElementById('detail-business-type').value;
        business.insuranceType = document.getElementById('detail-insurance-type').value;
        
        // Save to localStorage
        saveBusinessesToLocalStorage();
        
        // Update the table
        renderBusinessesTable();
        
        // Navigate back to business list
        showSection('business-list');
        
        // Show success message
        showAlert('Business updated successfully!', 'success');
    }
}

function handleUpdateCompany(e) {
    e.preventDefault();
    
    const companyId = parseInt(document.getElementById('company-details-form').dataset.companyId);
    const company = companies.find(c => c.id === companyId);
    
    if (company) {
        // Update company with new values (only editable fields)
        company.name = document.getElementById('detail-company-name').value;
        company.phone = document.getElementById('detail-company-phone').value;
        company.address = document.getElementById('detail-company-address').value;
        company.deliveryArea = document.getElementById('detail-company-delivery-zone').value;

        // Update admin fields (name and phone are editable, ID is not)
        company.adminName = document.getElementById('detail-company-admin-name').value;
        company.adminPhone = document.getElementById('detail-company-admin-phone').value;

        // Update Company Owner Name if field is visible (for intermediary WW businesses)
        const ownerNameField = document.getElementById('detail-company-owner-name');
        if (ownerNameField && ownerNameField.offsetParent !== null) {
            company.companyOwnerName = ownerNameField.value;
        }

        // Update status (very important)
        company.status = document.getElementById('detail-company-status-header').value;
        
        // Save to localStorage
        saveCompaniesToLocalStorage();
        
        // Update the table
        renderCompaniesTable();
        
        // Navigate back to company list
        showSection('company-list');
        
        // Show success message with status emphasis if status was changed
        const statusName = formatStatus(company.status);
        showAlert(`Company updated successfully! Current status: ${statusName}`, 'success');
    }
}

function viewBusinessDetails(businessId) {
    const business = businesses.find(b => b.id === businessId);
    if (business) {
        console.log('Viewing business details:', business);
        showAlert(`Business Details: ${business.name}`, 'info');
    }
}

// Export functionality
function exportPartnersData() {
    const csvContent = [
        ['ID', 'Name', 'Business', 'Delivery Area', 'Status', 'CEO Email', 'Created At'].join(','),
        ...partners.map(partner => [
            partner.id,
            `"${partner.name}"`,
            `"${partner.businessName}"`,
            `"${partner.deliveryArea}"`,
            partner.status,
            `"${partner.ceoEmail}"`,
            partner.createdAt
        ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'partners-data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'k':
                e.preventDefault();
                document.getElementById('partner-search')?.focus();
                break;
            case 'n':
                e.preventDefault();
                openModal('create-partner-modal');
                break;
        }
    }
    
    if (e.key === 'Escape') {
        // Close any open modal
        document.querySelectorAll('.modal.show').forEach(modal => {
            closeModal(modal.id);
        });
    }
});

// Auto-save form data
function autoSaveFormData() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const formData = {};
                inputs.forEach(inp => {
                    if (inp.value) {
                        formData[inp.id] = inp.value;
                    }
                });
                localStorage.setItem(`rooster-form-${form.id}`, JSON.stringify(formData));
            });
        });
    });
}

// Restore form data
function restoreFormData() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const savedData = JSON.parse(localStorage.getItem(`rooster-form-${form.id}`) || '{}');
        Object.keys(savedData).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = savedData[key];
            }
        });
    });
}

// Initialize auto-save
document.addEventListener('DOMContentLoaded', function() {
    autoSaveFormData();
    restoreFormData();
});

// Clear auto-saved data on successful form submission
function clearAutoSaveData(formId) {
    localStorage.removeItem(`rooster-form-${formId}`);
}

// Verification Functions
function verifyBRN(brnNumber) {
    if (!brnNumber || brnNumber.trim() === '') {
        updateVerificationStatus('brn-verification', 'pending', 'Enter BRN to verify');
        updateSubmitButtonState();
        return;
    }
    
    // Initialize attempt counter if not exists
    if (!window.brnVerificationAttempts) {
        window.brnVerificationAttempts = 0;
    }
    
    window.brnVerificationAttempts++;
    
    updateVerificationStatus('brn-verification', 'verifying', `Verifying with Government website... (Attempt ${window.brnVerificationAttempts}/2)`);
    updateSubmitButtonState();
    
    // Simulate API call to government website
    setTimeout(() => {
        if (window.brnVerificationAttempts < 2) {
            // First attempt fails
            console.log('BRN verification attempt', window.brnVerificationAttempts, 'failed');
            updateVerificationStatus('brn-verification', 'failed', 'BRN verification failed. Please check the number and try again.');
        } else {
            // Second attempt succeeds
            console.log('BRN verification attempt', window.brnVerificationAttempts, 'succeeded');
            updateVerificationStatus('brn-verification', 'verified', 'BRN verified successfully');
            
            // Update verify button to match bank verification style
            const verifyButton = document.querySelector('button[onclick*="verifyBRN"]');
            if (verifyButton) {
                verifyButton.disabled = true;
                verifyButton.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
                verifyButton.style.background = '#4CAF50';
            }
            
            window.brnVerificationAttempts = 0; // Reset for next time
        }
        updateSubmitButtonState();
    }, 2000);
}

function verifyAdminID(adminId) {
    if (!adminId || adminId.trim() === '') {
        updateVerificationStatus('admin-verification', 'pending', 'Enter Admin ID to verify');
        return;
    }

    // Initialize attempt counter if not exists
    if (!window.adminVerificationAttempts) {
        window.adminVerificationAttempts = 0;
    }

    window.adminVerificationAttempts++;
    console.log('Starting Admin ID verification attempt', window.adminVerificationAttempts);

    // Disable verify button during verification
    const verifyButton = document.getElementById('verify-admin-btn');
    if (verifyButton) {
        verifyButton.disabled = true;
        verifyButton.textContent = 'Verifying...';
    }

    updateVerificationStatus('admin-verification', 'verifying', `Verifying with Partner Centre... (Attempt ${window.adminVerificationAttempts}/2)`);
    
    // Simulate API call to Partner Centre
    setTimeout(() => {
        if (window.adminVerificationAttempts < 2) {
            // First attempt fails
            console.log('Admin ID verification attempt', window.adminVerificationAttempts, 'failed');
            updateVerificationStatus('admin-verification', 'failed', 'Admin ID not found in Partner Centre. Please check and try again.');
            // Re-enable the verify button for retry
            const verifyButton = document.getElementById('verify-admin-btn');
            if (verifyButton) {
                verifyButton.disabled = false;
                verifyButton.innerHTML = '<i class="fas fa-check"></i> Verify with Partner Centre';
            }
        } else {
            // Second attempt succeeds
            console.log('Admin ID verification attempt', window.adminVerificationAttempts, 'succeeded');
            updateVerificationStatus('admin-verification', 'verified', 'Admin ID verified in Partner Centre');

            // Update verify button to match other verification styles
            const verifyButton = document.getElementById('verify-admin-btn');
            if (verifyButton) {
                verifyButton.disabled = true;
                verifyButton.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
                verifyButton.style.background = '#4CAF50';
            }

            window.adminVerificationAttempts = 0; // Reset for next time
        }
    }, 2000);
}

// Verify intermediary business registration number
function verifyIntermediaryRegistration(registrationNumber) {
    if (!registrationNumber || registrationNumber.trim() === '') {
        updateVerificationStatus('registration-verification', 'pending', 'Enter registration number to verify');
        return;
    }

    // Initialize attempt counter if not exists
    if (!window.registrationVerificationAttempts) {
        window.registrationVerificationAttempts = 0;
    }

    window.registrationVerificationAttempts++;
    console.log('Starting Registration number verification attempt', window.registrationVerificationAttempts);

    // Disable verify button during verification
    const verifyButton = document.getElementById('verify-registration-btn');
    if (verifyButton) {
        verifyButton.disabled = true;
        verifyButton.textContent = 'Verifying...';
    }

    updateVerificationStatus('registration-verification', 'verifying', `Verifying with business registry... (Attempt ${window.registrationVerificationAttempts}/2)`);

    // Simulate API call to business registry
    setTimeout(() => {
        if (window.registrationVerificationAttempts < 2) {
            // First attempt fails
            console.log('Registration verification attempt', window.registrationVerificationAttempts, 'failed');
            updateVerificationStatus('registration-verification', 'failed', 'Registration number not found in business registry. Please check and try again.');
            // Re-enable the verify button for retry
            const verifyButton = document.getElementById('verify-registration-btn');
            if (verifyButton) {
                verifyButton.disabled = false;
                verifyButton.innerHTML = '<i class="fas fa-check"></i> Verify';
            }
        } else {
            // Second attempt succeeds
            console.log('Registration verification attempt', window.registrationVerificationAttempts, 'succeeded');
            updateVerificationStatus('registration-verification', 'verified', 'Registration number verified in business registry');

            // Update verify button to match other verification styles
            const verifyButton = document.getElementById('verify-registration-btn');
            if (verifyButton) {
                verifyButton.disabled = true;
                verifyButton.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
                verifyButton.style.background = '#4CAF50';
            }

            window.registrationVerificationAttempts = 0; // Reset for next time
        }

        // Update form validation state
        updateSubmitButtonState();
    }, 2000);
}


function verifyBankAccount() {
    // Collect all bank information
    const bankInfo = {
        bankName: document.getElementById('bank-name')?.value?.trim(),
        accountNumber: document.getElementById('bank-number')?.value?.trim(),
        accountHolder: document.getElementById('account-holder')?.value?.trim()
    };
    
    // Check if all bank fields are filled
    if (!bankInfo.bankName || !bankInfo.accountNumber || !bankInfo.accountHolder) {
        updateVerificationStatus('bank-verification', 'pending', 'Complete all bank information to verify');
        updateSubmitButtonState();
        return;
    }
    
    // Disable verify button during verification
    const verifyButton = document.getElementById('verify-bank-btn');
    if (verifyButton) {
        verifyButton.disabled = true;
        verifyButton.textContent = 'Verifying...';
    }
    
    updateVerificationStatus('bank-verification', 'verifying', 'Verifying bank account with financial institution...');
    updateSubmitButtonState();
    
    // Simulate bank account verification API call - always succeeds
    setTimeout(() => {
        console.log('Bank verification succeeded');
        updateVerificationStatus('bank-verification', 'verified', 'Bank account verified successfully');
        const verifyButton = document.getElementById('verify-bank-btn');
        if (verifyButton) {
            verifyButton.disabled = true;
            verifyButton.innerHTML = '<i class="fas fa-check-circle"></i> Verified';
            verifyButton.style.background = '#4CAF50';
        }
        updateSubmitButtonState();
    }, 2000); // Reasonable verification time
}


// Add helper function to check bank fields completion status
function checkBankFieldsCompletion() {
    const bankFields = {
        bankName: document.getElementById('bank-name')?.value?.trim(),
        accountNumber: document.getElementById('bank-number')?.value?.trim(),
        accountHolder: document.getElementById('account-holder')?.value?.trim()
    };
    
    const filledFields = Object.values(bankFields).filter(value => value).length;
    const totalFields = 3;
    
    if (filledFields === 0) {
        updateVerificationStatus('bank-verification', 'pending', 'Enter bank information to verify');
    } else if (filledFields < totalFields) {
        updateVerificationStatus('bank-verification', 'pending', `Complete all bank fields (${filledFields}/${totalFields} filled)`);
    }
    
    return filledFields === totalFields;
}

// Update bank field completion status in real-time
function initializeBankFieldsStatus() {
    const bankFields = ['bank-name', 'bank-number', 'account-holder'];
    bankFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                const verification = document.getElementById('bank-verification');
                
                // If verification is already complete and user changes something, require re-verification
                if (verification && verification.classList.contains('verified')) {
                    console.log('Bank field modified after successful verification - requiring re-verification');
                    verification.classList.remove('verified');
                    const verifyButton = document.getElementById('verify-bank-btn');
                    if (verifyButton) {
                        verifyButton.disabled = false;
                        verifyButton.innerHTML = '<i class="fas fa-check"></i> Verify Bank Account Information';
                        verifyButton.style.background = '#6ba3f5';
                    }
                    updateVerificationStatus('bank-verification', 'pending', 'Bank information changed. Please verify again.');
                    updateSubmitButtonState();
                }
            });
        }
    });
}

function updateVerificationStatus(elementId, status, message) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    // Remove all status classes
    element.classList.remove('pending', 'verifying', 'verified', 'failed');
    
    // Add new status class
    element.classList.add(status);
    
    // Update icon and message
    let icon = '';
    switch (status) {
        case 'pending':
            icon = '<i class="fas fa-clock"></i>';
            break;
        case 'verifying':
            icon = '<i class="fas fa-spinner fa-spin"></i>';
            break;
        case 'verified':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'failed':
            icon = '<i class="fas fa-times-circle"></i>';
            break;
    }
    
    element.innerHTML = `${icon} ${message}`;
}

// Toggle Intermediary Fields based on insurance type (This function is no longer needed for Business form)
function toggleIntermediaryFields() {
    // This function was used for the old intermediary section in Business form
    // which has been removed. The intermediary logic is now only in Company form
    // via the updateBusinessInfo() function
}

// File Upload Handling
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('tax-document');
    const fileUpload = document.querySelector('.file-upload');
    
    if (fileInput && fileUpload) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            const uploadText = fileUpload.querySelector('.file-upload-text');
            
            if (file) {
                fileUpload.classList.add('has-file');
                uploadText.innerHTML = `<i class="fas fa-file-check"></i> ${file.name}`;
            } else {
                fileUpload.classList.remove('has-file');
                uploadText.innerHTML = '<i class="fas fa-upload"></i> Click to upload or drag and drop';
            }
        });
        
        // Drag and drop functionality
        fileUpload.addEventListener('dragover', function(e) {
            e.preventDefault();
            fileUpload.style.borderColor = '#6ba3f5';
        });
        
        fileUpload.addEventListener('dragleave', function(e) {
            e.preventDefault();
            fileUpload.style.borderColor = '#3a3a3a';
        });
        
        fileUpload.addEventListener('drop', function(e) {
            e.preventDefault();
            fileUpload.style.borderColor = '#3a3a3a';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                fileInput.dispatchEvent(new Event('change'));
            }
        });
    }
});

// Generate SAP code for business
function generateSapCode(businessData) {
    // SAP code format: SAP + Business Type (2) + Region (2) + Sequential (4)
    const businessType = businessData.type === 'single-partner' ? 'SP' : 'IN';
    const regionCode = getRegionCode(businessData.region);
    const sequential = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    
    return `SAP${businessType}${regionCode}${sequential}`;
}

function getRegionCode(region) {
    const regionCodes = {
        'Korea': 'KR',
        'Japan': 'JP', 
        'Singapore': 'SG',
        'Malaysia': 'MY',
        'Thailand': 'TH',
        'Vietnam': 'VN',
        'Philippines': 'PH',
        'Indonesia': 'ID'
    };
    return regionCodes[region] || 'XX';
}

// Display SAP code after business creation
function displaySapCode(sapCode) {
    const sapDisplay = document.createElement('div');
    sapDisplay.className = 'sap-code-display';
    sapDisplay.innerHTML = `
        <div class="success-message">
            <h3>Business Created Successfully!</h3>
            <p>Your SAP Code: <strong>${sapCode}</strong></p>
            <p class="note">Please save this code for future reference</p>
        </div>
    `;
    
    // Show SAP code in alert
    showAlert(`Business created successfully! SAP Code: ${sapCode}`, 'success');
}

// Bulk company creation functionality
function initializeBulkCreation() {
    const bulkButton = document.getElementById('bulk-create-companies-btn');
    if (bulkButton) {
        bulkButton.addEventListener('click', showBulkCreationModal);
    }
}

function showBulkCreationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal bulk-creation-modal show';
    modal.id = 'bulk-creation-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal('bulk-creation-modal')"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>Bulk Company Creation</h2>
                <button class="modal-close-btn" onclick="closeModal('bulk-creation-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="upload-section">
                    <h3>Upload CSV File</h3>
                    <div class="file-upload-area" ondrop="handleBulkFileDrop(event)" ondragover="event.preventDefault()">
                        <div class="file-upload-icon">📄</div>
                        <p>Drop CSV file here or <button type="button" onclick="document.getElementById('bulk-file-input').click()" class="link-button">browse</button></p>
                        <input type="file" id="bulk-file-input" accept=".csv" style="display: none;" onchange="handleBulkFileSelect(this)">
                    </div>
                    <div class="csv-template">
                        <h4>CSV Template</h4>
                        <p>Download the <a href="#" onclick="downloadCSVTemplate()" class="download-link">template file</a> to ensure proper formatting.</p>
                        <div class="template-preview">
                            <code>companyName,businessId,deliveryArea,ceoEmail</code><br>
                            <code>"ABC Logistics","BUS001","Seoul Central","ceo@abc.com"</code>
                        </div>
                    </div>
                </div>
                <div class="preview-section" id="bulk-preview" style="display: none;">
                    <h3>Preview</h3>
                    <div class="preview-table-container">
                        <table class="preview-table" id="preview-table">
                            <!-- Table content will be populated by JavaScript -->
                        </table>
                    </div>
                    <div class="validation-summary" id="validation-summary">
                        <!-- Validation results will be shown here -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="secondary-btn" onclick="closeModal('bulk-creation-modal')">Cancel</button>
                <button class="primary-btn" id="bulk-create-confirm" style="display: none;" onclick="processBulkCreation()">Create Companies</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function handleBulkFileDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processBulkFile(files[0]);
    }
}

function handleBulkFileSelect(input) {
    if (input.files.length > 0) {
        processBulkFile(input.files[0]);
    }
}

function processBulkFile(file) {
    if (!file.name.toLowerCase().endsWith('.csv')) {
        showAlert('Please select a CSV file', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const csv = e.target.result;
        const data = parseCSV(csv);
        displayBulkPreview(data);
    };
    reader.readAsText(file);
}

function parseCSV(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
    const data = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        data.push(row);
    }
    
    return data;
}

function displayBulkPreview(data) {
    const previewSection = document.getElementById('bulk-preview');
    const previewTable = document.getElementById('preview-table');
    const confirmButton = document.getElementById('bulk-create-confirm');
    
    // Generate table HTML
    let tableHTML = '<thead><tr>';
    const headers = ['Company Name', 'Business', 'Delivery Area', 'CEO Email', 'Status'];
    headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    
    let validCount = 0;
    let errorCount = 0;
    
    data.forEach((row, index) => {
        const isValid = validateBulkRow(row);
        const statusClass = isValid ? 'valid' : 'error';
        const statusText = isValid ? 'Valid' : 'Error';
        
        if (isValid) validCount++;
        else errorCount++;
        
        const business = businesses.find(b => b.id === row.businessId);
        
        tableHTML += `<tr class="${statusClass}">`;
        tableHTML += `<td>${row.companyName || ''}</td>`;
        tableHTML += `<td>${business ? business.name : row.businessId}</td>`;
        tableHTML += `<td>${row.deliveryArea || ''}</td>`;
        tableHTML += `<td>${row.ceoEmail || ''}</td>`;
        tableHTML += `<td><span class="status-badge ${statusClass}">${statusText}</span></td>`;
        tableHTML += '</tr>';
    });
    
    tableHTML += '</tbody>';
    previewTable.innerHTML = tableHTML;
    
    // Show validation summary
    const validationSummary = document.getElementById('validation-summary');
    validationSummary.innerHTML = `
        <div class="validation-stats">
            <div class="stat valid">
                <span class="count">${validCount}</span>
                <span class="label">Valid</span>
            </div>
            <div class="stat error">
                <span class="count">${errorCount}</span>
                <span class="label">Errors</span>
            </div>
        </div>
        ${validCount > 0 ? '<p class="success-text">Ready to create ' + validCount + ' companies</p>' : ''}
        ${errorCount > 0 ? '<p class="error-text">Please fix ' + errorCount + ' errors before proceeding</p>' : ''}
    `;
    
    // Show preview section and enable/disable confirm button
    previewSection.style.display = 'block';
    confirmButton.style.display = validCount > 0 ? 'inline-block' : 'none';
    
    // Store data for processing
    window.bulkCreationData = data.filter(row => validateBulkRow(row));
}

function validateBulkRow(row) {
    return row.companyName && 
           row.businessId && 
           businesses.find(b => b.id === row.businessId) &&
           row.deliveryArea &&
           row.ceoEmail && 
           row.ceoEmail.includes('@');
}

function processBulkCreation() {
    const data = window.bulkCreationData;
    if (!data || data.length === 0) {
        showAlert('No valid data to process', 'error');
        return;
    }
    
    // Show progress indicator
    const confirmButton = document.getElementById('bulk-create-confirm');
    confirmButton.textContent = 'Creating...';
    confirmButton.disabled = true;
    
    // Process each company
    let processed = 0;
    const total = data.length;
    
    data.forEach((companyData, index) => {
        setTimeout(() => {
            createCompanyFromBulk(companyData);
            processed++;
            
            confirmButton.textContent = `Creating... (${processed}/${total})`;
            
            if (processed === total) {
                showAlert(`Successfully created ${processed} companies`, 'success');
                closeModal('bulk-creation-modal');
                renderCompaniesTable();
            }
        }, index * 200); // Stagger creation to avoid overwhelming the system
    });
}

function createCompanyFromBulk(data) {
    const business = businesses.find(b => b.id === data.businessId);
    const newCompany = {
        id: Math.max(...companies.map(c => c.id)) + 1,
        name: data.companyName,
        phone: data.phone || '',
        address: data.address || '',
        businessId: data.businessId,
        businessName: business ? business.name : '',
        deliveryArea: data.deliveryArea,
        status: 'preparing',
        ceoEmail: data.ceoEmail,
        createdAt: new Date().toISOString().split('T')[0],
        contractId: `CON${String(Math.max(...companies.map(c => parseInt(c.contractId.replace('CON', '')))) + 1).padStart(3, '0')}`
    };
    
    companies.push(newCompany);

    // Update business company count after bulk creation
    if (business) {
        business.companiesCount = companies.filter(c => c.businessId === business.id).length;
    }
}

function downloadCSVTemplate() {
    const csvContent = 'companyName,businessId,deliveryArea,ceoEmail\n"Sample Logistics Co","BUS001","Seoul Central","ceo@sample.com"\n"Express Delivery Inc","BUS002","Busan Port","ceo@express.com"';
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '3pl-company-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// View details functionality
function viewCompanyDetails(companyId) {
    const company = companies.find(c => c.id === companyId);
    if (!company) {
        showAlert('Company not found', 'error');
        return;
    }
    
    const modal = createDetailsModal('company', company);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function viewBusinessDetails(businessId) {
    const business = businesses.find(b => b.id === businessId);
    if (!business) {
        showAlert('Business not found', 'error');
        return;
    }
    
    const modal = createDetailsModal('business', business);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function createDetailsModal(type, data) {
    const modal = document.createElement('div');
    modal.className = 'modal details-modal show';
    modal.id = 'details-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal('details-modal')"></div>
        <div class="modal-content large">
            <div class="modal-header">
                <h2>${type === 'business' ? 'Business' : 'Company'} Details</h2>
                <button class="modal-close-btn" onclick="closeModal('details-modal')">&times;</button>
            </div>
            <div class="modal-body">
                ${generateDetailsHTML(type, data)}
            </div>
            <div class="modal-footer">
                <button class="secondary-btn" onclick="closeModal('details-modal')">Close</button>
                <button class="primary-btn" onclick="edit${type === 'business' ? 'Business' : 'Company'}('${data.id}'); closeModal('details-modal')">Edit</button>
            </div>
        </div>
    `;
    return modal;
}

function generateDetailsHTML(type, data) {
    if (type === 'business') {
        return `
            <div class="details-section">
                <h3>Basic Information</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Business Name:</label>
                        <span>${data.name || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Business Type:</label>
                        <span class="badge ${data.type}">${data.type === 'intermediary-ww' ? 'Intermediary' : 'Single Partner'}</span>
                    </div>
                    <div class="detail-item">
                        <label>BRN:</label>
                        <span>${data.brn || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>SAP Code:</label>
                        <span class="sap-code">${data.sapCode || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div class="details-section">
                <h3>Bank Information</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Bank Name:</label>
                        <span>${data.bankName || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Account Number:</label>
                        <span>${data.bankNumber || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Account Holder:</label>
                        <span>${data.accountHolder || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div class="details-section">
                <h3>Owner Information</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Owner Name:</label>
                        <span>${data.ownerName || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Phone:</label>
                        <span>${data.ownerPhone || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Birthday:</label>
                        <span>${data.ownerBirthday || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div class="details-section">
                <h3>Business Location</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Business Location:</label>
                        <span>${data.businessLocation || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Head Office:</label>
                        <span>${data.headOfficeLocation || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Opening Date:</label>
                        <span>${data.openingDate || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div class="details-section">
                <h3>Status & Verification</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Companies Count:</label>
                        <span class="count-badge">${data.companiesCount || 0}</span>
                    </div>
                    <div class="detail-item">
                        <label>Taxation Type:</label>
                        <span>${data.taxationType || 'N/A'}</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        const business = businesses.find(b => b.id === data.businessId);
        return `
            <div class="details-section">
                <h3>Company Information</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Company Name:</label>
                        <span>${data.name || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <label>Company ID:</label>
                        <span class="company-id">${data.id}</span>
                    </div>
                    <div class="detail-item">
                        <label>Business:</label>
                        <span>${data.businessName} (${data.businessId})</span>
                    </div>
                    <div class="detail-item">
                        <label>Delivery Area:</label>
                        <span class="delivery-area">${data.deliveryArea}</span>
                    </div>
                </div>
            </div>
            <div class="details-section">
                <h3>Contact Information</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>CEO Email:</label>
                        <span class="email-address">${data.ceoEmail || 'N/A'}</span>
                    </div>
                </div>
            </div>
            <div class="details-section">
                <h3>Status Information</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Status:</label>
                        <span class="status-badge status-${data.status}">${formatStatus(data.status)}</span>
                    </div>
                    <div class="detail-item">
                        <label>Contract ID:</label>
                        <span class="contract-id">${data.contractId}</span>
                    </div>
                    <div class="detail-item">
                        <label>Created Date:</label>
                        <span>${data.createdAt}</span>
                    </div>
                </div>
            </div>
            ${business ? `
            <div class="details-section">
                <h3>Associated Business Details</h3>
                <div class="details-grid">
                    <div class="detail-item">
                        <label>Business Type:</label>
                        <span class="badge ${business.type}">${business.type === 'intermediary-ww' ? 'Intermediary' : 'Single Partner'}</span>
                    </div>
                    <div class="detail-item">
                        <label>SAP Code:</label>
                        <span class="sap-code">${business.sapCode || 'N/A'}</span>
                    </div>
                </div>
            </div>
            ` : ''}
        `;
    }
}

// Initialize bulk creation functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeBulkCreation();
    initializeFormValidation();
    initializeBankFieldsStatus();
});