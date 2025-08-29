// Aziend Consultancy - JavaScript functionality

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Load header component
    loadHeaderComponent();

    // Load footer component
    loadFooterComponent();

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Initialize all components
    initializeTheme();
    // Navigation will be initialized after header loads
    initializeServices();
    initializeCostCalculator();
    initializeRegulationUpdates();
    // Consent banner will be initialized after header loads
    initializeContactForm();
    initializeSmoothScrolling();
    initializeAnimations();

    console.log("Aziend Consultancy website initialized");
}

// Header component loader
function loadHeaderComponent() {
    const headerContainer = document.getElementById("header-container");
    if (headerContainer) {
        fetch("header.html")
            .then((response) => response.text())
            .then((html) => {
                headerContainer.innerHTML = html;
                // Re-initialize Lucide icons after header is loaded
                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }
                // Re-initialize navigation after header is loaded
                initializeNavigation();
                initializeConsentBanner();
            })
            .catch((error) => {
                console.error("Error loading header component:", error);
                // Fallback: show a basic header message
                headerContainer.innerHTML =
                    '<header class="bg-white border-b border-gray-200 py-4"><div class="container mx-auto px-6"><h1 class="text-2xl font-bold">Aziend</h1></div></header>';
            });
    }
}

// Footer component loader
function loadFooterComponent() {
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("footer.html")
            .then((response) => response.text())
            .then((html) => {
                footerContainer.innerHTML = html;
                // Re-initialize Lucide icons after footer is loaded
                if (typeof lucide !== "undefined") {
                    lucide.createIcons();
                }
            })
            .catch((error) => {
                console.error("Error loading footer component:", error);
                // Fallback: show a basic footer message
                footerContainer.innerHTML =
                    '<footer class="bg-gray-900 text-white text-center py-8"><p>© 2025 Aziend. All rights reserved.</p></footer>';
            });
    }
}

// Services data
const servicesData = [
    {
        id: 1,
        title: "Company Formation",
        icon: "building-2",
        forPersona: "Entrepreneurs & Startups",
        solves: "Mainland (DED) & Free Zones (ADGM, DIFC, DMCC, IFZA, RAKEZ, SHAMS, SPCFZ) and Offshore",
        outcomes: [
            "Name reservation",
            "License application",
            "MOA/AOA",
            "Office options",
        ],
        timeline: "2-6 weeks",
    },
    {
        id: 2,
        title: "Corporate Tax (9%)",
        icon: "percent",
        forPersona: "Business Owners",
        solves: "Registration, impact assessment, return filing, reliefs/exemptions, group structuring, and compliance calendar",
        outcomes: [
            "CT registration",
            "Returns & filing",
            "Transfer pricing (light)",
        ],
        timeline: "Ongoing",
    },
    {
        id: 3,
        title: "VAT (5%)",
        icon: "calculator",
        forPersona: "Finance Teams",
        solves: "VAT registration, refunds, periodic filings, voluntary & mandatory thresholds, invoicing & record‑keeping",
        outcomes: ["TRN registration", "VAT returns", "Advisory"],
        timeline: "Ongoing",
    },
    {
        id: 4,
        title: "ESR / UBO / AML‑CFT",
        icon: "shield-check",
        forPersona: "Compliance Teams",
        solves: "Economic Substance (notification & report), Ultimate Beneficial Owner registry, AML policies, KYC & risk scoring",
        outcomes: ["ESR filing", "UBO register", "AML program"],
        timeline: "Annual",
    },
    {
        id: 5,
        title: "PRO & Government Liaison",
        icon: "users",
        forPersona: "HR & Operations",
        solves: "Visas, work permits, labour cards, Emirates ID, attestations, license renewals, and document clearances",
        outcomes: ["Employment & dependent visas", "Golden Visa advisory"],
        timeline: "2-8 weeks",
    },
    {
        id: 6,
        title: "Banking & Treasury",
        icon: "credit-card",
        forPersona: "Finance Teams",
        solves: "Corporate bank account opening support, KYC packs, payments setup, treasury & cash‑flow good practices",
        outcomes: ["Account opening", "Merchant & POS"],
        timeline: "2-6 weeks",
    },
    {
        id: 7,
        title: "Accounting, Payroll & WPS",
        icon: "file-text",
        forPersona: "Finance & HR Teams",
        solves: "IFRS bookkeeping, monthly closes, payroll, WPS, end‑of‑service gratuity, and audit readiness",
        outcomes: ["Virtual CFO", "Audit coordination"],
        timeline: "Monthly",
    },
    {
        id: 8,
        title: "Corporate Governance & Policies",
        icon: "clipboard-check",
        forPersona: "Board & Management",
        solves: "Board & shareholder resolutions, company secretarial, internal controls, risk registers, and ESG roadmap",
        outcomes: ["Policy toolkit", "Risk & controls"],
        timeline: "Quarterly",
    },
    {
        id: 9,
        title: "M&A, DD & Valuations (lite)",
        icon: "trending-up",
        forPersona: "Investors & Acquirers",
        solves: "Buy‑/sell‑side readiness, due diligence checklists, cap table & valuation guidance (non‑regulated advisory)",
        outcomes: ["DD checklists", "Vendor data room"],
        timeline: "3-6 months",
    },
    {
        id: 10,
        title: "Customs & Trade",
        icon: "package",
        forPersona: "Import/Export Teams",
        solves: "Importer registration, customs code, origin documentation, and duty optimization for free zones",
        outcomes: ["Customs code", "Origin certs"],
        timeline: "2-4 weeks",
    },
];

// Theme functionality
function initializeTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme") || "light";

    // Set initial theme
    setTheme(currentTheme);

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const newTheme =
                document.documentElement.getAttribute("data-theme") === "dark"
                    ? "light"
                    : "dark";
            setTheme(newTheme);
        });
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update theme toggle icon
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
        const icon = themeToggle.querySelector("i");
        if (icon) {
            icon.setAttribute("data-lucide", theme === "dark" ? "sun" : "moon");
            if (typeof lucide !== "undefined") {
                lucide.createIcons();
            }
        }
    }
}

// Navigation functionality
function initializeNavigation() {
    const servicesDropdown = document.getElementById("services-dropdown");
    const servicesMenu = document.getElementById("services-menu");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");

    // Services dropdown
    if (servicesDropdown && servicesMenu) {
        servicesDropdown.addEventListener("click", function (e) {
            e.stopPropagation();
            servicesMenu.classList.toggle("hidden");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function () {
            servicesMenu.classList.add("hidden");
        });
    }

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener("click", function () {
            // For now, just show an alert - you can implement full mobile menu later
            alert("Mobile menu functionality - to be implemented");
        });
    }

    // Populate services dropdown
    populateServicesDropdown();
}

function populateServicesDropdown() {
    const servicesMenu = document.getElementById("services-menu");
    if (!servicesMenu) return;

    const menuHTML = servicesData
        .map((service) => {
            // Special handling for services with dedicated pages
            let href = "#services";
            if (service.id === 1) {
                href = "/company-formation.html";
            } else if (service.id === 2) {
                href = "/corporate-tax.html";
            } else if (service.id === 3) {
                href = "/vat.html";
            } else if (service.id === 4) {
                href = "/esr-ubo-aml.html";
            } else if (service.id === 5) {
                href = "/pro-government-liaison.html";
            } else if (service.id === 6) {
                href = "/banking-treasury.html";
            } else if (service.id === 7) {
                href = "/accounting-payroll-wps.html";
            } else if (service.id === 8) {
                href = "/corporate-governance-policies.html";
            } else if (service.id === 9) {
                href = "/ma-dd-valuations.html";
            } else if (service.id === 10) {
                href = "/customs-trade.html";
            }
            return `
        <a href="${href}" class="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <i data-lucide="${service.icon}" class="w-6 h-6 text-custom-600 mt-1"></i>
            <div>
                <div class="font-medium text-sm">${service.title}</div>
                <div class="text-xs text-gray-500">For ${service.forPersona}</div>
            </div>
        </a>
    `;
        })
        .join("");

    servicesMenu.innerHTML = menuHTML;

    // Reinitialize icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
} // Services section
function initializeServices() {
    populateServicesGrid();
}

function populateServicesGrid() {
    const servicesGrid = document.getElementById("services-grid");
    if (!servicesGrid) return;

    const servicesHTML = servicesData
        .map((service) => {
            return `
        <div class="service-card bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div class="flex items-start space-x-4 mb-4">
                <i data-lucide="${
                    service.icon
                }" class="w-6 h-6 text-custom-600 mt-1"></i>
                <div class="flex-1">
                    <h3 class="text-lg font-semibold mb-1">${service.title}</h3>
                    <div class="text-sm text-custom-600 font-medium mb-2">For: ${
                        service.forPersona
                    }</div>
                </div>
            </div>
            <div class="space-y-3">
                <div>
                    <div class="font-medium text-sm mb-1">Solves:</div>
                    <div class="text-sm text-gray-600">${service.solves}</div>
                </div>
                <div>
                    <div class="font-medium text-sm mb-2">Key Outcomes:</div>
                    <ul class="text-sm text-gray-600 space-y-1">
                        ${service.outcomes
                            .map(
                                (outcome) => `
                            <li class="flex items-center space-x-2">
                                <i data-lucide="check-circle" class="w-3 h-3 text-custom-600 flex-shrink-0"></i>
                                <span>${outcome}</span>
                            </li>
                        `
                            )
                            .join("")}
                    </ul>
                </div>
                <div class="flex justify-between items-center text-sm pt-2">
                    <div>
                        <span class="font-medium">Timeline: </span>
                        <span class="text-gray-600">${service.timeline}</span>
                    </div>
                </div>
                <button class="w-full mt-3 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded transition-colors flex items-center justify-center" onclick="handleServiceExplore(${
                    service.id
                })">
                    Explore service
                    <i data-lucide="external-link" class="w-4 h-4 ml-2"></i>
                </button>
            </div>
        </div>
    `;
        })
        .join("");

    servicesGrid.innerHTML = servicesHTML;

    // Reinitialize icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

// Handle service exploration
function handleServiceExplore(serviceId) {
    if (serviceId === 1) {
        // Company Formation - redirect to dedicated page
        window.location.href = "/company-formation.html";
    } else if (serviceId === 2) {
        // Corporate Tax - redirect to dedicated page
        window.location.href = "/corporate-tax.html";
    } else if (serviceId === 3) {
        // VAT - redirect to dedicated page
        window.location.href = "/vat.html";
    } else if (serviceId === 4) {
        // ESR / UBO / AML-CFT - redirect to dedicated page
        window.location.href = "/esr-ubo-aml.html";
    } else if (serviceId === 5) {
        // PRO & Government Liaison - redirect to dedicated page
        window.location.href = "/pro-government-liaison.html";
    } else if (serviceId === 6) {
        // Banking & Treasury - redirect to dedicated page
        window.location.href = "/banking-treasury.html";
    } else if (serviceId === 7) {
        // Accounting, Payroll & WPS - redirect to dedicated page
        window.location.href = "/accounting-payroll-wps.html";
    } else if (serviceId === 8) {
        // Corporate Governance & Policies - redirect to dedicated page
        window.location.href = "/corporate-governance-policies.html";
    } else if (serviceId === 9) {
        // M&A, DD & Valuations - redirect to dedicated page
        window.location.href = "/ma-dd-valuations.html";
    } else if (serviceId === 10) {
        // Customs & Trade - redirect to dedicated page
        window.location.href = "/customs-trade.html";
    } else {
        // Other services - scroll to contact section
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    // Track the service exploration
    trackEvent("service_explore", {
        service_id: serviceId,
        service_name:
            servicesData.find((s) => s.id === serviceId)?.title || "Unknown",
    });
}

// Cost Calculator Data
const costCalculatorData = {
    government: {
        mainland: {
            trading: 8000,
            consulting: 7500,
            ecommerce: 8500,
            manufacturing: 12000,
            professional: 7000,
        },
        difc: {
            trading: 15000,
            consulting: 12000,
            ecommerce: 14000,
            manufacturing: 18000,
            professional: 11000,
        },
        adgm: {
            trading: 14000,
            consulting: 11500,
            ecommerce: 13500,
            manufacturing: 17000,
            professional: 10500,
        },
        dmcc: {
            trading: 16000,
            consulting: 13000,
            ecommerce: 15000,
            manufacturing: 19000,
            professional: 12000,
        },
        ifza: {
            trading: 6000,
            consulting: 5500,
            ecommerce: 6500,
            manufacturing: 9000,
            professional: 5000,
        },
        rakez: {
            trading: 7000,
            consulting: 6500,
            ecommerce: 7500,
            manufacturing: 10000,
            professional: 6000,
        },
        shams: {
            trading: 6500,
            consulting: 6000,
            ecommerce: 7000,
            manufacturing: 9500,
            professional: 5500,
        },
        spcfz: {
            trading: 6500,
            consulting: 6000,
            ecommerce: 7000,
            manufacturing: 9500,
            professional: 5500,
        },
        offshore: {
            trading: 5000,
            consulting: 4500,
            ecommerce: 5500,
            manufacturing: 7000,
            professional: 4000,
        },
    },
    service: {
        mainland: {
            trading: 5000,
            consulting: 4000,
            ecommerce: 5500,
            manufacturing: 7000,
            professional: 3500,
        },
        difc: {
            trading: 8000,
            consulting: 6500,
            ecommerce: 7500,
            manufacturing: 9500,
            professional: 6000,
        },
        adgm: {
            trading: 7500,
            consulting: 6000,
            ecommerce: 7000,
            manufacturing: 9000,
            professional: 5500,
        },
        dmcc: {
            trading: 8500,
            consulting: 7000,
            ecommerce: 8000,
            manufacturing: 10000,
            professional: 6500,
        },
        ifza: {
            trading: 3500,
            consulting: 3000,
            ecommerce: 4000,
            manufacturing: 5000,
            professional: 2500,
        },
        rakez: {
            trading: 4000,
            consulting: 3500,
            ecommerce: 4500,
            manufacturing: 5500,
            professional: 3000,
        },
        shams: {
            trading: 3750,
            consulting: 3250,
            ecommerce: 4250,
            manufacturing: 5250,
            professional: 2750,
        },
        spcfz: {
            trading: 3750,
            consulting: 3250,
            ecommerce: 4250,
            manufacturing: 5250,
            professional: 2750,
        },
        offshore: {
            trading: 3000,
            consulting: 2500,
            ecommerce: 3500,
            manufacturing: 4000,
            professional: 2000,
        },
    },
    office: {
        mainland: { virtual: 2000, flexi: 8000, dedicated: 15000 },
        difc: { virtual: 5000, flexi: 18000, dedicated: 35000 },
        adgm: { virtual: 4500, flexi: 16000, dedicated: 30000 },
        dmcc: { virtual: 5500, flexi: 20000, dedicated: 40000 },
        ifza: { virtual: 1500, flexi: 6000, dedicated: 12000 },
        rakez: { virtual: 1800, flexi: 7000, dedicated: 14000 },
        shams: { virtual: 1650, flexi: 6500, dedicated: 13000 },
        spcfz: { virtual: 1650, flexi: 6500, dedicated: 13000 },
        offshore: { virtual: 1000, flexi: 4000, dedicated: 8000 },
    },
    visa: {
        mainland: 3000,
        difc: 4000,
        adgm: 3800,
        dmcc: 4200,
        ifza: 2500,
        rakez: 2800,
        shams: 2600,
        spcfz: 2600,
        offshore: 2000,
    },
    timeline: {
        mainland: "3-4 weeks",
        difc: "1-2 weeks",
        adgm: "1-2 weeks",
        dmcc: "2-3 weeks",
        ifza: "2-3 weeks",
        rakez: "2-4 weeks",
        shams: "2-3 weeks",
        spcfz: "2-3 weeks",
        offshore: "1-2 weeks",
    },
};

// Corporate Tax Data
const corporateTaxData = {
    rates: {
        standardRate: 9,
        smallBusinessRate: 0,
        smallBusinessThreshold: 3000000,
        registrationThreshold: 375000,
    },
    servicePackages: {
        essentials: {
            name: "CT Essentials",
            price: 8500,
            currency: "AED",
            description: "Registration + first filing",
            features: [
                "CT registration setup",
                "EmaraTax platform access",
                "First annual return filing",
                "Basic compliance calendar",
            ],
        },
        professional: {
            name: "CT Professional",
            price: 15000,
            currency: "AED",
            period: "year",
            description: "Full compliance + quarterly support",
            popular: true,
            features: [
                "Everything in Essentials",
                "Quarterly compliance support",
                "FTA correspondence handling",
                "Tax provision calculations",
                "Relief eligibility reviews",
            ],
        },
        enterprise: {
            name: "CT Enterprise",
            price: 25000,
            currency: "AED",
            period: "year",
            description: "Group structuring + advisory",
            features: [
                "Everything in Professional",
                "Group relief optimization",
                "Transfer pricing documentation",
                "Strategic tax planning",
                "Dedicated tax manager",
            ],
        },
        oneTime: {
            assessment: { name: "CT Assessment", price: 2500, currency: "AED" },
            returnFiling: {
                name: "Return Filing",
                price: 3500,
                currency: "AED",
            },
            groupRelief: {
                name: "Group Relief Setup",
                price: 7500,
                currency: "AED",
            },
            auditSupport: {
                name: "FTA Audit Support",
                price: 5000,
                currency: "AED",
            },
        },
    },
    complianceDeadlines: {
        quarterlyNotification: {
            deadline: "April 30",
            description: "Quarterly notification filing deadline",
            requirements: [
                "Taxable income estimate",
                "Installment payment calculation",
                "Group relief elections",
            ],
        },
        annualReturn: {
            deadline: "9 months after FY-end",
            description: "Annual CT return filing",
            requirements: [
                "Complete financial statements",
                "Tax computation schedule",
                "Supporting documentation",
            ],
        },
        payment: {
            deadline: "9 months after FY-end",
            description: "CT payment deadlines",
            requirements: [
                "Annual payment due",
                "Quarterly installments",
                "Late payment interest",
            ],
        },
        penalties: {
            lateFilingMinimum: 1000,
            lateFilingPercentage: 5,
            incorrectFiling: 20000,
            voluntaryDisclosureBenefit: true,
        },
    },
    reliefAndExemptions: {
        smallBusinessRelief: {
            threshold: 3000000,
            rate: 0,
            conditions: ["UAE resident company", "Taxable income under AED 3M"],
        },
        participationExemption: {
            applicableTo: "Dividend income",
            conditions: ["5% shareholding minimum", "12-month holding period"],
        },
        freeZoneRelief: {
            rate: 0,
            conditions: [
                "Qualifying free zone person",
                "Qualifying income only",
                "Adequate substance",
            ],
        },
        qualifyingGroupRelief: {
            applicableTo: "Group companies",
            conditions: [
                "75% ownership",
                "UAE tax resident",
                "Election required",
            ],
        },
    },
    industryGuidance: {
        realEstate: {
            considerations: [
                "Property development taxation",
                "Rental income treatment",
                "Capital gains implications",
            ],
        },
        financialServices: {
            considerations: [
                "Banking income recognition",
                "Insurance provisions",
                "Investment fund structures",
            ],
        },
        oilAndGas: {
            considerations: [
                "Extractive activities",
                "Natural resource taxation",
                "Depletion allowances",
            ],
        },
        holdingCompanies: {
            considerations: [
                "Investment income treatment",
                "Subsidiary dividend exemptions",
                "Group structuring benefits",
            ],
        },
        ecommerce: {
            considerations: [
                "Digital services taxation",
                "Cross-border transactions",
                "Platform economy rules",
            ],
        },
        manufacturing: {
            considerations: [
                "Production incentives",
                "Export considerations",
                "Depreciation policies",
            ],
        },
    },
};

// VAT Data
const vatData = {
    registrationThresholds: {
        mandatory: 375000,
        voluntary: 187500,
        processingTime: "2-3 weeks",
    },
    rates: {
        standard: 5,
        zeroRated: 0,
        exempt: "N/A",
    },
    servicePackages: {
        starter: {
            name: "VAT Starter",
            price: 6500,
            currency: "AED",
            description: "Registration + 3 months support",
            features: [
                "VAT registration & TRN",
                "EmaraTax platform setup",
                "3 months filing support",
                "Basic compliance training",
            ],
        },
        professional: {
            name: "VAT Professional",
            price: 12000,
            currency: "AED",
            period: "year",
            description: "Full compliance + monthly filing",
            popular: true,
            features: [
                "Everything in Starter",
                "Monthly filing service",
                "FTA correspondence handling",
                "Refund claim assistance",
                "Compliance monitoring",
            ],
        },
        enterprise: {
            name: "VAT Enterprise",
            price: 20000,
            currency: "AED",
            period: "year",
            description: "Multi-entity + advisory",
            features: [
                "Everything in Professional",
                "Multi-entity management",
                "Strategic VAT planning",
                "Refund optimization",
                "Dedicated VAT manager",
            ],
        },
        refundRecovery: {
            name: "Refund Recovery Service",
            price: 15,
            unit: "% of recovered amount",
            description: "Specialized refund claim support",
            features: [
                "Refund eligibility assessment",
                "Historical recovery review",
                "Fast-track claim processing",
                "Success-based pricing",
            ],
        },
        oneTime: {
            registration: {
                name: "VAT Registration",
                price: 3500,
                currency: "AED",
            },
            returnFiling: {
                name: "Return Filing",
                price: 1500,
                currency: "AED",
                unit: "per return",
            },
            auditDefense: {
                name: "Audit Defense",
                price: 8000,
                currency: "AED",
            },
            complianceReview: {
                name: "Compliance Review",
                price: 2500,
                currency: "AED",
            },
        },
    },
    filingRequirements: {
        monthly: {
            deadline: "28th of following month",
            eligibility: "All registered businesses",
            penalties: "AED 500 - 20,000",
        },
        quarterly: {
            deadline: "28th of month following quarter-end",
            eligibility: "Businesses under AED 150M turnover",
            penalties: "AED 500 - 20,000",
        },
        annual: {
            deadline: "Yearly reconciliation",
            description: "Annual summary and compliance review",
        },
    },
    refundOptimization: {
        eligibleBusinesses: [
            "Export businesses",
            "Zero-rated supplies",
            "Input tax excess",
            "New business setup",
        ],
        averageRecoveryTime: "30-45 days",
        successRate: "95%",
        averageRefundAmount: "AED 50,000 - 500,000",
    },
    industryGuidance: {
        trading: {
            considerations: [
                "Import VAT handling",
                "Export zero-rating procedures",
                "Customs integration requirements",
                "Supply chain optimization",
            ],
        },
        healthcare: {
            considerations: [
                "Exempt supplies identification",
                "Input tax restrictions",
                "Medical equipment VAT treatment",
                "Patient service exemptions",
            ],
        },
        education: {
            considerations: [
                "Educational service exemptions",
                "Ancillary service taxation",
                "International student considerations",
                "Research activity treatment",
            ],
        },
        realEstate: {
            considerations: [
                "Residential vs commercial treatment",
                "First supply rules",
                "Ongoing rental income",
                "Property development stages",
            ],
        },
        financialServices: {
            considerations: [
                "Exempt activity identification",
                "Input tax apportionment",
                "Regulatory coordination",
                "Service classification",
            ],
        },
        hospitality: {
            considerations: [
                "Mixed supply treatment",
                "International visitor services",
                "Tourism package rules",
                "Hotel vs restaurant services",
            ],
        },
        manufacturing: {
            considerations: [
                "Production input treatment",
                "Export processing procedures",
                "Supply chain VAT optimization",
                "Raw material imports",
            ],
        },
    },
    complianceTools: {
        erpIntegration: [
            "SAP VAT module configuration",
            "Oracle tax calculation setup",
            "QuickBooks VAT features",
            "Custom system integration",
        ],
        automation: [
            "Real-time VAT computation",
            "Automated deadline reminders",
            "Digital submission features",
            "Compliance monitoring dashboards",
        ],
        eInvoicing: [
            "Digital invoice requirements",
            "System compatibility checks",
            "API integration setup",
            "Bulk upload capabilities",
        ],
    },
};

// ESR / UBO / AML-CFT Compliance Data
const complianceData = {
    esrRequirements: {
        notification: {
            deadline: "June 30",
            penalty: 20000,
            description:
                "Annual ESR notification mandatory for all UAE entities",
            requirements: [
                "Entity formation details",
                "Business activity declaration",
                "Relevant activity assessment",
                "Substance adequacy confirmation",
            ],
        },
        report: {
            deadline: "12 months after financial year-end",
            applicability: "Entities with relevant activities",
            penalties: "AED 20,000 - 300,000",
            requirements: [
                "Detailed substance information",
                "Employee and expenditure data",
                "Core income-generating activities",
                "Physical assets in UAE",
            ],
        },
        relevantActivities: [
            "IP Holding Business",
            "Banking Business",
            "Insurance Business",
            "Fund Management Business",
            "Financing and Leasing Business",
            "Shipping Business",
            "Headquarters Business",
            "Distribution and Service Centre Business",
            "Holding Company Business",
        ],
        substanceRequirements: {
            employees: "Adequate number of qualified employees in UAE",
            expenditure: "Adequate operating expenditure incurred in UAE",
            assets: "Physical assets located in UAE",
            ciga: "Core income-generating activities conducted in UAE",
        },
    },
    uboRequirements: {
        definition: {
            ownershipThreshold: 25,
            directOwnership: "Direct ownership of 25% or more",
            indirectOwnership: "Indirect ownership of 25% or more",
            controlMechanisms: [
                "Voting rights control",
                "Board appointment rights",
                "Veto powers",
                "Other control mechanisms",
            ],
        },
        registrationTimeline: {
            newEntity: "Within 15 days of entity formation",
            changeInUBO: "Within 15 days of UBO change",
            annualConfirmation: "Annual confirmation required",
            penalties: "AED 20,000 - 100,000 for non-compliance",
        },
        requiredInformation: [
            "Full name and personal details",
            "Nationality and residency status",
            "Ownership percentage",
            "Nature of control",
            "Supporting documentation",
            "Contact information",
        ],
        exemptions: [
            "Listed companies",
            "Wholly government-owned entities",
            "Regulated financial institutions",
        ],
    },
    amlCftRequirements: {
        applicableEntities: [
            "Financial institutions",
            "Designated non-financial businesses",
            "Real estate agencies",
            "Precious metals dealers",
            "Legal professionals",
            "Accounting firms",
        ],
        riskAssessment: {
            customerRisk: ["High", "Medium", "Low"],
            productRisk: ["Complex products", "Simple products"],
            geographicRisk: [
                "High-risk jurisdictions",
                "Standard jurisdictions",
            ],
            deliveryRisk: ["Non-face-to-face", "Face-to-face"],
        },
        kycRequirements: {
            customerIdentification: [
                "Identity verification",
                "Address verification",
                "Source of funds verification",
                "Beneficial ownership identification",
            ],
            enhancedDueDiligence: [
                "PEP screening",
                "Sanctions list checking",
                "Adverse media screening",
                "Source of wealth verification",
            ],
            ongoingMonitoring: [
                "Transaction monitoring",
                "Periodic review",
                "Profile updates",
                "Suspicious activity reporting",
            ],
        },
        recordKeeping: {
            transactionRecords: "5 years minimum",
            customerRecords: "5 years after relationship ends",
            trainingRecords: "5 years minimum",
            auditTrail: "Complete audit trail required",
        },
    },
    servicePackages: {
        starter: {
            name: "Compliance Starter",
            price: 8500,
            currency: "AED",
            description: "ESR filing + UBO registration",
            features: [
                "ESR notification filing",
                "UBO identification & registration",
                "Basic compliance guidance",
                "Deadline monitoring",
            ],
        },
        professional: {
            name: "Compliance Professional",
            price: 15000,
            currency: "AED",
            period: "year",
            description: "Full compliance + quarterly support",
            popular: true,
            features: [
                "Everything in Starter",
                "ESR report preparation",
                "Basic AML program",
                "Annual UBO confirmations",
                "Regulatory correspondence",
            ],
        },
        enterprise: {
            name: "Compliance Enterprise",
            price: 25000,
            currency: "AED",
            period: "year",
            description: "Complete ESR/UBO/AML + monitoring",
            features: [
                "Everything in Professional",
                "Comprehensive AML program",
                "Substance monitoring",
                "Regulatory examination support",
                "Dedicated compliance manager",
            ],
        },
        amlSpecialist: {
            name: "AML Specialist",
            price: 35000,
            currency: "AED",
            description: "Dedicated AML program design",
            features: [
                "Custom AML program design",
                "KYC procedures implementation",
                "Transaction monitoring setup",
                "Staff training programs",
                "Regulatory technology integration",
            ],
        },
        oneTime: {
            esrNotification: {
                name: "ESR Notification",
                price: 2500,
                currency: "AED",
            },
            esrReport: { name: "ESR Report", price: 5000, currency: "AED" },
            uboRegistration: {
                name: "UBO Registration",
                price: 3000,
                currency: "AED",
            },
            amlAssessment: {
                name: "AML Assessment",
                price: 7500,
                currency: "AED",
            },
            complianceReview: {
                name: "Compliance Review",
                price: 4000,
                currency: "AED",
            },
        },
    },
    complianceCalendar: {
        january: ["Annual UBO confirmation reviews", "AML policy updates"],
        march: ["ESR notification preparation", "Q1 compliance monitoring"],
        june: [
            "ESR notification deadline (June 30)",
            "Mid-year compliance review",
        ],
        september: ["Q3 compliance assessment", "ESR report preparation"],
        december: [
            "ESR report deadline (varies by FY-end)",
            "Annual compliance audit",
        ],
    },
    penalties: {
        esr: {
            lateNotification: 20000,
            lateReport: 50000,
            incorrectInfo: 100000,
            nonCompliance: 300000,
        },
        ubo: {
            lateRegistration: 20000,
            incorrectInfo: 50000,
            failureToUpdate: 100000,
        },
        aml: {
            inadequateControls: "Up to AED 500,000",
            recordKeepingFailure: "Up to AED 100,000",
            reportingFailure: "Up to AED 200,000",
        },
    },
    industryGuidance: {
        investmentHolding: {
            esrConsiderations: [
                "Relevant activity classification",
                "Substance requirement analysis",
                "Group structure optimization",
            ],
            uboComplexity: "High - Multiple ownership layers",
            amlRisk: "Medium to High",
        },
        banking: {
            esrConsiderations: [
                "Banking business classification",
                "Core income-generating activities",
                "Adequate substance demonstration",
            ],
            uboComplexity: "Medium - Regulatory oversight",
            amlRisk: "High - Enhanced requirements",
        },
        realEstate: {
            esrConsiderations: [
                "Property development vs investment",
                "Rental income treatment",
                "Substance requirements",
            ],
            uboComplexity: "Medium - Property ownership structures",
            amlRisk: "High - Cash transactions",
        },
        professionalServices: {
            esrConsiderations: [
                "Service center classification",
                "IP holding considerations",
                "Headquarters activities",
            ],
            uboComplexity: "Low to Medium",
            amlRisk: "Medium - Client advisory",
        },
    },
};

// PRO & Government Liaison Data
const proData = {
    visaTypes: {
        employment: {
            name: "Employment Visa",
            requirements: [
                "Valid employment offer",
                "Educational qualifications",
                "Medical examination",
                "Clean criminal record",
            ],
            processingTime: "4-6 weeks",
            validity: "2-3 years",
            renewal: "Yes",
        },
        investor: {
            name: "Investor Visa",
            requirements: [
                "Business investment proof",
                "Minimum capital requirement",
                "Business plan",
                "Clean criminal record",
            ],
            processingTime: "6-8 weeks",
            validity: "2-3 years",
            renewal: "Yes",
        },
        golden: {
            name: "Golden Visa",
            requirements: [
                "Investment of AED 2M+ or professional qualification",
                "Proof of investment/expertise",
                "Clean criminal record",
                "Medical examination",
            ],
            processingTime: "8-12 weeks",
            validity: "10 years",
            renewal: "Yes",
        },
        family: {
            name: "Family/Dependent Visa",
            requirements: [
                "Valid sponsor residence visa",
                "Minimum salary requirement",
                "Family relationship proof",
                "Medical examination",
            ],
            processingTime: "2-4 weeks",
            validity: "Same as sponsor",
            renewal: "Yes",
        },
        visit: {
            name: "Visit Visa",
            requirements: [
                "Valid passport",
                "Sponsor or hotel booking",
                "Return ticket",
                "Financial proof",
            ],
            processingTime: "1-3 days",
            validity: "30-90 days",
            renewal: "Limited",
        },
    },
    salaryRequirements: {
        phd: {
            minimum: 15000,
            currency: "AED",
            description: "PhD holders minimum salary requirement",
        },
        masters: {
            minimum: 12000,
            currency: "AED",
            description: "Master's degree holders minimum salary",
        },
        bachelors: {
            minimum: 8000,
            currency: "AED",
            description: "Bachelor's degree holders minimum salary",
        },
        diploma: {
            minimum: 5000,
            currency: "AED",
            description: "Diploma holders minimum salary",
        },
        highSchool: {
            minimum: 4000,
            currency: "AED",
            description: "High school certificate minimum salary",
        },
    },
    goldenVisaCategories: {
        investors: {
            realEstate: {
                minimum: 2000000,
                currency: "AED",
                description: "Real estate investment minimum",
            },
            businessInvestment: {
                minimum: 500000,
                currency: "AED",
                description: "Business investment with specific criteria",
            },
            publicInvestment: {
                minimum: 2000000,
                currency: "AED",
                description: "Investment in government bonds/funds",
            },
        },
        professionals: [
            "Doctors and specialists",
            "Engineers and architects",
            "Scientists and researchers",
            "IT and technology experts",
            "Legal professionals",
        ],
        students: [
            "Outstanding students (95%+ grades)",
            "PhD holders",
            "Honor graduates",
            "Future leaders program participants",
        ],
        entrepreneurs: [
            "Startup founders",
            "Innovation leaders",
            "Technology pioneers",
            "Creative industry leaders",
        ],
    },
    servicePackages: {
        essentials: {
            name: "PRO Essentials",
            price: 3500,
            currency: "AED",
            description: "Basic visa processing + Emirates ID",
            features: [
                "Entry permit processing",
                "Medical examination coordination",
                "Emirates ID application",
                "Basic documentation support",
            ],
        },
        professional: {
            name: "PRO Professional",
            price: 5500,
            currency: "AED",
            description: "Complete employment visa package",
            popular: true,
            features: [
                "Everything in Essentials",
                "Work permit processing",
                "Labor contract setup",
                "Document attestation",
                "Status tracking",
            ],
        },
        enterprise: {
            name: "PRO Enterprise",
            price: 12000,
            currency: "AED",
            period: "year",
            description: "Multiple employees + ongoing support",
            features: [
                "Everything in Professional",
                "Bulk processing (5+ visas)",
                "Renewal management",
                "Compliance monitoring",
                "Dedicated account manager",
            ],
        },
        goldenSpecialist: {
            name: "Golden Visa Specialist",
            price: 15000,
            currency: "AED",
            description: "Dedicated Golden Visa processing",
            features: [
                "Eligibility assessment",
                "Investment guidance",
                "Application preparation",
                "Family inclusion support",
                "VIP processing",
            ],
        },
        familyPackage: {
            name: "Family Package",
            price: 8000,
            currency: "AED",
            description: "Multiple dependents processing",
            features: [
                "Spouse visa processing",
                "Children visa processing",
                "Parent visa options",
                "School enrollment support",
                "Family documentation",
            ],
        },
        corporateRetainer: {
            name: "Corporate Retainer",
            price: 18000,
            currency: "AED",
            period: "year",
            description: "Ongoing PRO services",
            features: [
                "Unlimited consultations",
                "Priority processing",
                "Government liaison",
                "Compliance monitoring",
                "Annual planning",
            ],
        },
    },
    governmentDepartments: {
        mohre: {
            name: "Ministry of Human Resources and Emiratisation",
            abbreviation: "MOHRE",
            services: [
                "Work permit approvals",
                "Labor contracts",
                "WPS compliance",
                "Employment relations",
            ],
            processingTime: "2-3 weeks",
        },
        ica: {
            name: "Federal Authority for Identity, Citizenship, Customs & Port Security",
            abbreviation: "ICA",
            services: [
                "Entry permits",
                "Residence visas",
                "Emirates ID",
                "Passport services",
            ],
            processingTime: "1-2 weeks",
        },
        gdrfa: {
            name: "General Directorate of Residency and Foreigners Affairs",
            abbreviation: "GDRFA",
            services: [
                "Dubai visa processing",
                "Visa renewals",
                "Status changes",
                "Deportation orders",
            ],
            processingTime: "1-3 weeks",
        },
        medical: {
            name: "UAE Medical Commission",
            services: [
                "Health card processing",
                "Medical examinations",
                "Health requirements",
                "Medical fitness certificates",
            ],
            processingTime: "1 week",
        },
    },
    processingTimelines: {
        employment: {
            workPermit: "2-3 weeks",
            entryPermit: "1-2 weeks",
            residenceVisa: "2-3 weeks",
            emiratesId: "1-2 weeks",
            total: "6-10 weeks",
        },
        golden: {
            eligibilityAssessment: "1-2 weeks",
            applicationSubmission: "2-3 weeks",
            approvalProcess: "4-6 weeks",
            visaIssuance: "1-2 weeks",
            total: "8-13 weeks",
        },
        family: {
            sponsorEligibility: "1 week",
            applicationSubmission: "1-2 weeks",
            processing: "2-3 weeks",
            visaIssuance: "1 week",
            total: "5-7 weeks",
        },
    },
    documentAttestation: {
        educational: {
            certificates: [
                "Degree certificates",
                "Transcripts",
                "Professional certifications",
            ],
            process: [
                "Country of origin authentication",
                "UAE Embassy attestation",
                "MOFA legalization",
                "Arabic translation",
            ],
            timeline: "3-6 weeks",
        },
        commercial: {
            documents: [
                "Trade license",
                "Memorandum of Association",
                "Power of attorney",
                "Commercial agreements",
            ],
            process: [
                "Notarization",
                "Chamber of Commerce",
                "Ministry attestation",
                "UAE Embassy",
            ],
            timeline: "2-4 weeks",
        },
        personal: {
            documents: [
                "Marriage certificates",
                "Birth certificates",
                "Police clearance",
                "Divorce decrees",
            ],
            process: [
                "Local authentication",
                "Foreign ministry",
                "UAE Embassy",
                "MOFA UAE",
            ],
            timeline: "4-8 weeks",
        },
    },
    freeZoneSpecialization: {
        difc: {
            name: "Dubai International Financial Centre",
            visaTypes: [
                "Financial services professionals",
                "Investor visas",
                "Family dependent visas",
            ],
            specialFeatures: [
                "Fast-track processing",
                "Regulatory expertise",
                "Financial sector focus",
            ],
        },
        adgm: {
            name: "Abu Dhabi Global Market",
            visaTypes: [
                "Financial sector employment",
                "Business setup visas",
                "Dependent processing",
            ],
            specialFeatures: [
                "Abu Dhabi benefits",
                "Financial services focus",
                "International standards",
            ],
        },
        dmcc: {
            name: "Dubai Multi Commodities Centre",
            visaTypes: [
                "Trading professionals",
                "Commodity specialists",
                "Business owner visas",
            ],
            specialFeatures: [
                "Commodities expertise",
                "Trading focus",
                "Business facilitation",
            ],
        },
    },
    costStructure: {
        government: {
            employment: {
                workPermit: 1200,
                entryPermit: 500,
                residenceVisa: 1000,
                emiratesId: 300,
            },
            golden: {
                application: 2000,
                processing: 2000,
                issuance: 1000,
                emiratesId: 300,
            },
            family: {
                entryPermit: 400,
                residenceVisa: 800,
                emiratesId: 300,
            },
        },
        service: {
            basic: 2500,
            professional: 3500,
            premium: 5000,
            golden: 10000,
        },
        medical: {
            basic: 500,
            comprehensive: 800,
            family: 400,
        },
    },
    complianceRequirements: {
        renewal: {
            timeline: "30-60 days before expiry",
            requirements: [
                "Valid passport",
                "Salary certificate",
                "Medical examination",
                "Emirates ID renewal",
            ],
            penalties: "AED 100-1000 per day overstay",
        },
        statusChange: {
            employerChange: [
                "NOC from current employer",
                "New employment offer",
                "Salary transfer",
                "Visa transfer process",
            ],
            visaChange: [
                "Eligibility assessment",
                "Document update",
                "Application submission",
                "Approval process",
            ],
        },
    },
};

// Accounting, Payroll & WPS Data
const accountingData = {
    services: {
        accounting: {
            name: "Accounting Services",
            basePrice: 2500,
            currency: "AED",
            period: "month",
            includes: [
                "Bookkeeping & Financial Records",
                "VAT Registration & Filing",
                "Corporate Tax Compliance",
                "Financial Statement Preparation",
                "Audit Support & Liaison",
                "Management Reporting",
            ],
            timeline: "3-5 business days setup",
            employeeCostPerMonth: 50,
        },
        payroll: {
            name: "Payroll Management",
            basePrice: 1800,
            currency: "AED",
            period: "month",
            includes: [
                "Employee Salary Processing",
                "End-of-Service Calculations",
                "Payroll Tax Compliance",
                "Employee Benefits Management",
                "Salary Certificates",
                "Labor Law Compliance",
            ],
            timeline: "2-3 business days setup",
            employeeCostPerMonth: 75,
        },
        wps: {
            name: "WPS Compliance",
            basePrice: 1200,
            currency: "AED",
            period: "month",
            includes: [
                "WPS Registration & Setup",
                "Monthly Salary Uploads",
                "MOL Compliance Reporting",
                "Employee Data Management",
                "Dispute Resolution Support",
                "System Integration",
            ],
            timeline: "5-7 business days setup",
            employeeCostPerMonth: 25,
        },
        full: {
            name: "Complete Solution",
            basePrice: 4500,
            currency: "AED",
            period: "month",
            savings: 20,
            includes: [
                "All Accounting Services",
                "All Payroll Services",
                "All WPS Services",
                "Dedicated Account Manager",
                "Priority Support",
                "Custom Integrations",
                "Advanced Reporting",
            ],
            timeline: "7-10 business days setup",
            employeeCostPerMonth: 100,
        },
    },
    packages: {
        basic: {
            name: "Basic Accounting",
            price: 2500,
            currency: "AED",
            period: "month",
            description: "Essential accounting services for small businesses",
            features: [
                "Monthly bookkeeping",
                "VAT return filing",
                "Financial statements",
                "Basic compliance",
            ],
            excluded: ["Payroll services"],
            timeline: "3-5 business days",
            supportLevel: "Email support",
        },
        payroll: {
            name: "Payroll Management",
            price: 1800,
            currency: "AED",
            period: "month",
            description: "Comprehensive payroll processing",
            features: [
                "Monthly payroll processing",
                "Employee benefits",
                "Salary certificates",
                "Labor compliance",
                "End-of-service calculations",
            ],
            timeline: "2-3 business days",
            supportLevel: "Phone & email support",
        },
        wps: {
            name: "WPS Compliance",
            price: 1200,
            currency: "AED",
            period: "month",
            description: "Complete WPS management",
            features: [
                "WPS registration",
                "Monthly uploads",
                "MOL compliance",
                "Employee management",
                "Dispute support",
            ],
            timeline: "5-7 business days",
            supportLevel: "Dedicated support",
        },
        complete: {
            name: "Complete Solution",
            price: 4500,
            currency: "AED",
            period: "month",
            description: "All-in-one accounting and payroll solution",
            popular: true,
            savings: "Save 20%",
            features: [
                "Everything in all packages",
                "Dedicated account manager",
                "Priority support",
                "Custom integrations",
                "Advanced reporting",
            ],
            timeline: "7-10 business days",
            supportLevel: "Dedicated account manager",
        },
    },
    compliance: {
        vat: {
            registration: "VAT registration within 30 days",
            returns: "Monthly/quarterly VAT returns",
            deadlines: "28th of following month",
            penalties: "AED 500 - 20,000 for late filing",
        },
        corporateTax: {
            registration: "CT registration for qualifying businesses",
            returns: "Annual CT returns within 9 months",
            rates: "9% on profits above AED 375,000",
            exemptions: "Small business relief available",
        },
        payrollTax: {
            requirements: "Payroll tax compliance",
            filings: "Monthly payroll submissions",
            wps: "WPS compliance mandatory",
            penalties: "Fines for non-compliance",
        },
    },
    timelines: {
        accounting: {
            setup: "3-5 business days",
            firstService: "Within 48 hours",
            monthlyClosing: "5 business days",
            annualReports: "15 business days",
        },
        payroll: {
            setup: "2-3 business days",
            firstPayroll: "Same day setup",
            monthlyProcessing: "1-2 business days",
            endOfService: "3-5 business days",
        },
        wps: {
            setup: "5-7 business days",
            registration: "7-10 business days",
            monthlyUploads: "Same day",
            reporting: "2-3 business days",
        },
        full: {
            setup: "7-10 business days",
            integration: "3-5 business days",
            firstService: "Within 24 hours",
            fullImplementation: "2-3 weeks",
        },
    },
    documents: {
        accounting: [
            "Trade License",
            "Bank Statements (6 months)",
            "Previous VAT Returns",
            "Chart of Accounts",
            "Invoice Templates",
        ],
        payroll: [
            "Employee Contracts",
            "Emirates ID copies",
            "Salary Structure",
            "Bank Account Details",
            "Labor Card copies",
        ],
        wps: [
            "MOL Registration",
            "Employee Database",
            "Bank Account Info",
            "WPS Agreement",
            "System Access Credentials",
        ],
        full: [
            "All above documents",
            "Company Profile",
            "Organizational Chart",
            "Previous Financial Records",
            "System Integration Requirements",
        ],
    },
    software: {
        accounting: [
            "QuickBooks Integration",
            "SAP Business One",
            "Xero Accounting",
            "Sage 50",
            "Zoho Books",
        ],
        payroll: [
            "HRMS Integration",
            "ADP Payroll",
            "BambooHR",
            "Workday",
            "PeopleHR",
        ],
        wps: [
            "MOL WPS Portal",
            "Bank WPS Systems",
            "HRMS Integration",
            "Custom API Solutions",
            "Automated Upload Systems",
        ],
    },
    frequencyMultipliers: {
        monthly: 1.0,
        quarterly: 0.85,
        annual: 0.7,
    },
    complianceAddons: {
        basic: 0,
        standard: 500,
        premium: 1000,
    },
    employeeThresholds: {
        small: { max: 10, multiplier: 1.0 },
        medium: { max: 50, multiplier: 1.2 },
        large: { max: 200, multiplier: 1.5 },
        enterprise: { max: 500, multiplier: 2.0 },
    },
};

// Corporate Governance & Policies Data
const governanceData = {
    services: {
        board: {
            name: "Board Resolutions",
            basePrice: 3000,
            currency: "AED",
            period: "quarter",
            includes: [
                "Board Resolution Drafting",
                "Meeting Minutes Preparation",
                "Director Appointment Support",
                "Regulatory Filing Support",
                "Compliance Monitoring",
            ],
            timeline: "48-72 hours turnaround",
            directorCostPerQuarter: 200,
        },
        secretarial: {
            name: "Company Secretarial",
            basePrice: 2800,
            currency: "AED",
            period: "quarter",
            includes: [
                "Statutory Registers Maintenance",
                "Corporate Records Management",
                "Compliance Calendar Management",
                "Regulatory Correspondence",
                "Share Certificate Management",
                "Corporate Structure Optimization",
            ],
            timeline: "Ongoing monthly service",
            directorCostPerQuarter: 150,
        },
        risk: {
            name: "Risk Management",
            basePrice: 4200,
            currency: "AED",
            period: "quarter",
            includes: [
                "Risk Register Development",
                "Internal Control Frameworks",
                "Compliance Monitoring Systems",
                "Policy Development & Review",
                "Audit Committee Support",
                "Control Testing Procedures",
            ],
            timeline: "2-4 weeks implementation",
            directorCostPerQuarter: 250,
        },
        esg: {
            name: "ESG Roadmap",
            basePrice: 5500,
            currency: "AED",
            period: "quarter",
            includes: [
                "ESG Strategy Development",
                "Sustainability Reporting",
                "Stakeholder Engagement",
                "ESG Compliance Frameworks",
                "Impact Measurement",
                "Sustainability Roadmaps",
            ],
            timeline: "4-6 weeks development",
            directorCostPerQuarter: 300,
        },
        complete: {
            name: "Complete Governance Package",
            basePrice: 8500,
            currency: "AED",
            period: "quarter",
            savings: 20,
            includes: [
                "All Board Services",
                "All Secretarial Services",
                "All Risk Management",
                "All ESG Services",
                "Dedicated Governance Manager",
                "Board Portal Access",
                "Priority Support",
            ],
            timeline: "3-5 weeks full implementation",
            directorCostPerQuarter: 400,
        },
    },
    packages: {
        basic: {
            name: "Basic Governance",
            price: 3500,
            currency: "AED",
            period: "quarter",
            description: "Essential governance services for small companies",
            features: [
                "Basic board resolutions",
                "Quarterly meetings support",
                "Standard compliance",
                "Basic documentation",
            ],
            excluded: ["Risk management"],
            timeline: "2-3 business days",
            supportLevel: "Email support",
        },
        secretarial: {
            name: "Company Secretarial",
            price: 2800,
            currency: "AED",
            period: "quarter",
            description: "Comprehensive secretarial services",
            features: [
                "Statutory registers maintenance",
                "Corporate records management",
                "Compliance calendar",
                "Regulatory correspondence",
                "Share certificates",
            ],
            timeline: "Ongoing service",
            supportLevel: "Phone & email support",
        },
        risk: {
            name: "Risk & Controls",
            price: 4200,
            currency: "AED",
            period: "quarter",
            description: "Complete risk management framework",
            features: [
                "Risk register development",
                "Internal control frameworks",
                "Compliance monitoring",
                "Policy development",
                "Audit committee support",
            ],
            timeline: "2-4 weeks",
            supportLevel: "Dedicated support",
        },
        complete: {
            name: "Complete Governance",
            price: 8500,
            currency: "AED",
            period: "quarter",
            description: "All-in-one governance solution",
            popular: true,
            savings: "Save 20%",
            features: [
                "Everything in all packages",
                "Dedicated governance manager",
                "ESG roadmap development",
                "Board portal access",
                "Priority support",
            ],
            timeline: "3-5 weeks",
            supportLevel: "Dedicated governance manager",
        },
    },
    compliance: {
        uaeCommercialLaw: {
            requirements: "UAE Commercial Companies Law compliance",
            filings: "Annual returns and statutory filings",
            deadlines: "Various regulatory deadlines",
            penalties: "Fines for non-compliance",
        },
        sca: {
            requirements: "Securities and Commodities Authority regulations",
            applicability: "Listed companies and investment entities",
            filings: "Periodic disclosure requirements",
            governance: "Corporate governance code compliance",
        },
        freezone: {
            requirements: "Free zone specific governance requirements",
            variations: "DIFC, ADGM, DMCC specific rules",
            reporting: "Authority-specific reporting",
            compliance: "Ongoing compliance monitoring",
        },
    },
    timelines: {
        board: {
            setup: "24-48 hours",
            resolutionDrafting: "Same day",
            meetingPreparation: "2-3 business days",
            filingSupport: "1-2 business days",
        },
        secretarial: {
            setup: "1-2 weeks",
            ongoingService: "Monthly updates",
            complianceCalendar: "Quarterly reviews",
            registerMaintenance: "Real-time updates",
        },
        risk: {
            setup: "2-4 weeks",
            riskAssessment: "1-2 weeks",
            frameworkDevelopment: "3-4 weeks",
            implementation: "4-6 weeks",
        },
        esg: {
            setup: "4-6 weeks",
            strategyDevelopment: "6-8 weeks",
            reporting: "Quarterly",
            roadmapImplementation: "3-6 months",
        },
        complete: {
            setup: "3-5 weeks",
            fullImplementation: "6-8 weeks",
            ongoingSupport: "24/7 availability",
            quarterlyReviews: "Scheduled reviews",
        },
    },
    documents: {
        board: [
            "Articles of Association",
            "Board Charter",
            "Director Details",
            "Meeting Calendar",
            "Previous Resolutions",
        ],
        secretarial: [
            "Corporate Constitution",
            "Statutory Registers",
            "Share Registers",
            "Officer Details",
            "Compliance Calendar",
        ],
        risk: [
            "Current Risk Register",
            "Organizational Chart",
            "Process Documentation",
            "Policy Framework",
            "Audit Reports",
        ],
        esg: [
            "ESG Policy Framework",
            "Sustainability Reports",
            "Stakeholder Map",
            "Impact Metrics",
            "Regulatory Requirements",
        ],
        complete: [
            "All above documents",
            "Corporate Structure Chart",
            "Governance Framework",
            "Board Portal Access",
            "ESG Strategy Document",
        ],
    },
    frameworks: {
        oecd: [
            "Shareholder Rights",
            "Board Responsibilities",
            "Transparency & Disclosure",
            "Stakeholder Rights",
        ],
        kingIV: [
            "Leadership & Ethics",
            "Strategy & Performance",
            "Governance Functional Areas",
            "Governance Outcomes",
        ],
        esg: [
            "Environmental Impact",
            "Social Responsibility",
            "Governance Excellence",
            "Sustainability Reporting",
        ],
    },
    frequencyMultipliers: {
        monthly: 1.3,
        quarterly: 1.0,
        biannual: 0.8,
    },
    complianceAddons: {
        basic: 0,
        standard: 800,
        premium: 1500,
        listed: 2500,
    },
    complexityMultipliers: {
        simple: 1.0,
        standard: 1.2,
        complex: 1.5,
        listed: 2.0,
    },
    boardSizeThresholds: {
        small: { max: 5, multiplier: 1.0 },
        medium: { max: 9, multiplier: 1.3 },
        large: { max: 15, multiplier: 1.6 },
    },
};

// Banking & Treasury Data
const bankingData = {
    bankPartners: [
        {
            name: "Emirates NBD",
            logo: "https://via.placeholder.com/120x60/0052A5/ffffff?text=Emirates+NBD",
            successRate: 95,
            avgProcessingTime: "2-3 weeks",
            minInitialDeposit: 3000,
            accountTypes: [
                "Current",
                "Savings",
                "Fixed Deposit",
                "Call Account",
            ],
            digitalBanking: true,
            businessCategories: [
                "Trading",
                "Consulting",
                "Manufacturing",
                "Free Zone",
            ],
            contactPerson: "Sarah Al Mahmoud",
            relationshipManager: true,
        },
        {
            name: "ADCB",
            logo: "https://via.placeholder.com/120x60/B8860B/ffffff?text=ADCB",
            successRate: 92,
            avgProcessingTime: "2-4 weeks",
            minInitialDeposit: 5000,
            accountTypes: ["Current", "Savings", "Call Account"],
            digitalBanking: true,
            businessCategories: [
                "Professional Services",
                "Trading",
                "Free Zone",
            ],
            contactPerson: "Ahmed Hassan",
            relationshipManager: true,
        },
        {
            name: "First Abu Dhabi Bank",
            logo: "https://via.placeholder.com/120x60/1B365D/ffffff?text=FAB",
            successRate: 90,
            avgProcessingTime: "3-4 weeks",
            minInitialDeposit: 10000,
            accountTypes: ["Current", "Savings", "Premium Banking"],
            digitalBanking: true,
            businessCategories: [
                "Large Enterprises",
                "Trading",
                "Manufacturing",
            ],
            contactPerson: "Fatima Al Zahra",
            relationshipManager: true,
        },
        {
            name: "HSBC",
            logo: "https://via.placeholder.com/120x60/DB0011/ffffff?text=HSBC",
            successRate: 88,
            avgProcessingTime: "3-5 weeks",
            minInitialDeposit: 25000,
            accountTypes: [
                "Business Current",
                "Premier Banking",
                "Commercial Banking",
            ],
            digitalBanking: true,
            businessCategories: [
                "International Trade",
                "Professional Services",
                "Free Zone",
            ],
            contactPerson: "James Wilson",
            relationshipManager: true,
        },
        {
            name: "CBD",
            logo: "https://via.placeholder.com/120x60/0066CC/ffffff?text=CBD",
            successRate: 85,
            avgProcessingTime: "2-3 weeks",
            minInitialDeposit: 3000,
            accountTypes: ["Current", "Savings", "Call Account"],
            digitalBanking: true,
            businessCategories: ["SME", "Trading", "Consulting"],
            contactPerson: "Mariam Abdullah",
            relationshipManager: false,
        },
        {
            name: "RAKBANK",
            logo: "https://via.placeholder.com/120x60/E31837/ffffff?text=RAKBANK",
            successRate: 87,
            avgProcessingTime: "2-4 weeks",
            minInitialDeposit: 5000,
            accountTypes: ["Current", "Business Savings", "Call Account"],
            digitalBanking: true,
            businessCategories: ["SME", "Free Zone", "Professional Services"],
            contactPerson: "Omar Al Rashid",
            relationshipManager: false,
        },
    ],
    accountTypes: {
        current: {
            name: "Current Account",
            features: [
                "No minimum balance after initial deposit",
                "Unlimited transactions",
                "Checkbook facility",
                "Debit card",
            ],
            idealFor: [
                "Daily business operations",
                "High transaction volume",
                "Payment processing",
            ],
            avgMonthlyFee: 100,
        },
        savings: {
            name: "Business Savings",
            features: [
                "Interest earning",
                "Limited transactions",
                "Online banking",
                "Mobile app access",
            ],
            idealFor: [
                "Surplus fund management",
                "Short-term savings",
                "Emergency reserves",
            ],
            avgMonthlyFee: 50,
        },
        call: {
            name: "Call Account",
            features: [
                "Higher interest rates",
                "Notice period for withdrawals",
                "Flexible terms",
                "No monthly fees",
            ],
            idealFor: [
                "Medium-term investments",
                "Cash flow management",
                "Earning on reserves",
            ],
            avgMonthlyFee: 0,
        },
        fixed: {
            name: "Fixed Deposit",
            features: [
                "Guaranteed returns",
                "Fixed tenure",
                "Competitive rates",
                "Early withdrawal options",
            ],
            idealFor: [
                "Long-term savings",
                "Guaranteed returns",
                "Capital preservation",
            ],
            avgMonthlyFee: 0,
        },
    },
    servicePackages: {
        basic: {
            name: "Banking Basics",
            price: 4500,
            currency: "AED",
            description: "Essential banking setup for new businesses",
            duration: "One-time setup",
            features: [
                "Bank selection consultation",
                "Basic KYC document preparation",
                "Account application submission",
                "Initial banking guidance",
            ],
            inclusions: [
                "1 bank application",
                "Document review",
                "Application tracking",
                "Basic setup guidance",
            ],
            timeline: "2-4 weeks",
            successRate: "85%",
        },
        professional: {
            name: "Banking Professional",
            price: 7500,
            currency: "AED",
            description: "Comprehensive banking with merchant services",
            duration: "Setup + 3 months support",
            popular: true,
            features: [
                "Multi-bank consultation",
                "Complete KYC package preparation",
                "Account opening coordination",
                "Merchant account setup",
                "POS terminal arrangement",
                "Online banking configuration",
            ],
            inclusions: [
                "Up to 3 bank applications",
                "KYC document preparation",
                "Merchant services setup",
                "3 months post-opening support",
                "Digital banking setup",
            ],
            timeline: "2-6 weeks",
            successRate: "95%",
        },
        enterprise: {
            name: "Banking Enterprise",
            price: 15000,
            currency: "AED",
            description: "Multi-bank strategy with treasury management",
            duration: "Setup + 6 months advisory",
            features: [
                "Banking strategy consultation",
                "Multi-bank relationship management",
                "Treasury management setup",
                "Cash flow optimization",
                "Trade finance guidance",
                "Foreign exchange solutions",
            ],
            inclusions: [
                "Unlimited bank applications",
                "Treasury management consulting",
                "Trade finance setup",
                "6 months advisory support",
                "Quarterly banking reviews",
            ],
            timeline: "3-8 weeks",
            successRate: "98%",
        },
        concierge: {
            name: "Banking Concierge",
            price: 25000,
            currency: "AED",
            description:
                "White-glove banking with dedicated relationship management",
            duration: "Setup + 12 months relationship management",
            features: [
                "Dedicated relationship manager",
                "Priority bank introductions",
                "Custom banking solutions",
                "Investment advisory",
                "Private banking access",
                "24/7 banking support",
            ],
            inclusions: [
                "Dedicated relationship manager",
                "Priority processing",
                "Custom solutions design",
                "12 months ongoing support",
                "Quarterly strategy reviews",
                "Investment guidance",
            ],
            timeline: "1-4 weeks",
            successRate: "99%",
        },
    },
    kycRequirements: {
        mainland: {
            businessType: "Mainland Company",
            processingTime: "2-4 weeks",
            documents: [
                "Trade License (original + copy)",
                "Memorandum of Association",
                "Emirates ID (all partners/directors)",
                "Passport copies (all partners/directors)",
                "Salary certificate (if employed elsewhere)",
                "Bank statements (personal - 6 months)",
                "Business plan and projections",
                "Office lease agreement",
                "NOC from existing employer (if applicable)",
            ],
            additionalRequirements: [
                "Minimum capital requirement varies by bank",
                "Business activity must align with license",
                "Physical office presence required",
                "Regular business transactions expected",
            ],
        },
        freezone: {
            businessType: "Free Zone Company",
            processingTime: "1-3 weeks",
            documents: [
                "Free Zone License (original + copy)",
                "Certificate of Incorporation",
                "Memorandum of Association",
                "Emirates ID (all partners/directors)",
                "Passport copies (all partners/directors)",
                "Visa copies (residence visa)",
                "Personal bank statements (6 months)",
                "Business plan and cash flow projections",
                "Free zone NOC (if required)",
            ],
            additionalRequirements: [
                "Free zone good standing certificate",
                "Business activity verification",
                "Expected transaction volumes",
                "Source of funds documentation",
            ],
        },
        offshore: {
            businessType: "Offshore Company",
            processingTime: "3-6 weeks",
            documents: [
                "Certificate of Incorporation",
                "Memorandum & Articles of Association",
                "Certificate of Good Standing",
                "Register of Directors and Shareholders",
                "Emirates ID (UAE resident directors)",
                "Passport copies (all directors)",
                "Personal bank statements (6 months)",
                "Business plan and purpose",
                "Source of funds documentation",
                "Professional reference letters",
            ],
            additionalRequirements: [
                "Substance requirements may apply",
                "Purpose of account must be clearly defined",
                "Higher due diligence requirements",
                "Regular account reviews",
            ],
        },
    },
    calculatorOptions: {
        banks: [
            { id: "emirates_nbd", name: "Emirates NBD", tier: "tier1" },
            { id: "adcb", name: "ADCB", tier: "tier1" },
            { id: "fab", name: "First Abu Dhabi Bank", tier: "tier1" },
            { id: "hsbc", name: "HSBC", tier: "tier1" },
            { id: "cbd", name: "CBD", tier: "tier2" },
            { id: "rakbank", name: "RAKBANK", tier: "tier2" },
            { id: "uab", name: "United Arab Bank", tier: "tier2" },
            { id: "dib", name: "Dubai Islamic Bank", tier: "tier2" },
        ],
        businessTypes: [
            { id: "mainland", name: "Mainland Company" },
            { id: "freezone", name: "Free Zone Company" },
            { id: "offshore", name: "Offshore Company" },
        ],
        accountTypes: [
            { id: "current", name: "Current Account" },
            { id: "savings", name: "Business Savings" },
            { id: "call", name: "Call Account" },
            { id: "premium", name: "Premium Banking" },
        ],
        turnoverRanges: [
            { id: "startup", name: "Startup (0-500K AED)", multiplier: 1.0 },
            {
                id: "small",
                name: "Small Business (500K-2M AED)",
                multiplier: 1.2,
            },
            {
                id: "medium",
                name: "Medium Business (2M-10M AED)",
                multiplier: 1.5,
            },
            { id: "large", name: "Large Business (10M+ AED)", multiplier: 2.0 },
        ],
    },
    pricingStructure: {
        tier1Banks: {
            setupFee: 2500,
            relationshipFee: 1500,
            complexityMultiplier: 1.3,
        },
        tier2Banks: {
            setupFee: 1500,
            relationshipFee: 1000,
            complexityMultiplier: 1.0,
        },
        accountTypeFees: {
            current: 500,
            savings: 300,
            call: 400,
            premium: 1000,
        },
        businessTypeFees: {
            mainland: 0,
            freezone: 500,
            offshore: 1500,
        },
    },
    successStories: [
        {
            id: 1,
            company: "Dubai Tech Solutions LLC",
            industry: "Technology Consulting",
            challenge:
                "Failed to open accounts with 3 major banks due to complex business model",
            solution:
                "Strategic bank selection with detailed business plan presentation",
            outcome:
                "Successfully opened accounts with Emirates NBD and ADCB within 3 weeks",
            timeFrame: "3 weeks",
            testimonial:
                "Aziend's banking expertise saved our business launch timeline.",
        },
        {
            id: 2,
            company: "Gulf Trading DMCC",
            industry: "International Trading",
            challenge:
                "Required multi-currency accounts and trade finance facilities",
            solution: "Enterprise banking package with trade finance setup",
            outcome:
                "Established comprehensive banking with HSBC including USD, EUR, and AED accounts",
            timeFrame: "5 weeks",
            testimonial:
                "Their enterprise package delivered exactly what our trading operations needed.",
        },
        {
            id: 3,
            company: "Emirates Manufacturing FZE",
            industry: "Manufacturing",
            challenge:
                "High capital requirements and equipment financing needs",
            solution: "Concierge banking with investment advisory services",
            outcome:
                "Secured equipment financing and working capital facilities worth AED 5M",
            timeFrame: "2 weeks",
            testimonial:
                "The concierge service provided white-glove treatment that exceeded our expectations.",
        },
    ],
    faqs: [
        {
            question:
                "How long does corporate bank account opening take in UAE?",
            answer: "Typically 2-6 weeks depending on the bank, business type, and document completeness. Free zone companies often process faster (1-3 weeks) while offshore companies may take longer (3-6 weeks). Our professional service ensures optimal timing through proper preparation.",
        },
        {
            question:
                "What is the minimum deposit required for UAE business accounts?",
            answer: "Minimum deposits vary by bank and account type: Emirates NBD (AED 3,000), ADCB (AED 5,000), FAB (AED 10,000), HSBC (AED 25,000). Free zone accounts typically have lower requirements, while premium banking services require higher deposits.",
        },
        {
            question: "Can I open accounts with multiple banks in UAE?",
            answer: "Yes, many businesses maintain accounts with multiple banks for risk management and better service coverage. Our Enterprise package specifically helps establish multi-bank relationships for optimal cash flow management and banking redundancy.",
        },
        {
            question: "What if my bank application gets rejected?",
            answer: "Our success rate is 95%+ due to proper preparation and bank selection. If rejection occurs, we analyze feedback, address concerns, and reapply with alternative banks. Our Professional and Enterprise packages include multiple bank applications.",
        },
        {
            question: "Do you provide ongoing banking relationship management?",
            answer: "Yes, our Enterprise and Concierge packages include ongoing relationship management. This covers quarterly reviews, banking optimization, introduction to new products, and resolution of banking issues as they arise.",
        },
        {
            question: "Can you help with merchant accounts and POS terminals?",
            answer: "Absolutely. Our Professional package and above include merchant account setup, POS terminal arrangement, and online payment gateway integration. We work with major payment processors to ensure competitive rates.",
        },
    ],
};

// M&A, DD & Valuations Data
const maData = {
    transactionTypes: {
        acquisition: {
            name: "Buy-Side Acquisition",
            basePrice: 35000,
            description:
                "Strategic acquisition support with target identification and deal structuring",
            workstreams: [
                "Target screening",
                "Deal structuring",
                "Integration planning",
                "Negotiation support",
            ],
            timeline: "4-6 months",
        },
        divestiture: {
            name: "Sell-Side Divestiture",
            basePrice: 45000,
            description:
                "Comprehensive sell-side advisory from positioning through transaction closure",
            workstreams: [
                "Business optimization",
                "Information memorandum",
                "Buyer management",
                "Transaction execution",
            ],
            timeline: "3-5 months",
        },
        valuation: {
            name: "Business Valuation",
            basePrice: 15000,
            description:
                "Independent business valuation for strategic planning or transaction purposes",
            workstreams: [
                "Financial modeling",
                "Market analysis",
                "Comparable transactions",
                "Valuation report",
            ],
            timeline: "2-4 weeks",
        },
        dd_support: {
            name: "Due Diligence Support",
            basePrice: 25000,
            description:
                "Comprehensive DD coordination and management across all workstreams",
            workstreams: [
                "DD coordination",
                "Risk assessment",
                "Data room management",
                "Findings synthesis",
            ],
            timeline: "6-12 weeks",
        },
    },
    dealSizeMultipliers: {
        under_10m: { name: "Under AED 10M", multiplier: 1.0 },
        "10m_50m": { name: "AED 10M - 50M", multiplier: 1.5 },
        "50m_200m": { name: "AED 50M - 200M", multiplier: 2.0 },
        over_200m: { name: "Over AED 200M", multiplier: 3.0 },
    },
    complexityMultipliers: {
        simple: {
            name: "Simple",
            multiplier: 1.0,
            description: "Single entity, standard structure",
        },
        standard: {
            name: "Standard",
            multiplier: 1.3,
            description: "Multiple entities, moderate complexity",
        },
        complex: {
            name: "Complex",
            multiplier: 1.8,
            description: "Multi-jurisdictional, complex structure",
        },
        cross_border: {
            name: "Cross-border",
            multiplier: 2.2,
            description: "International components",
        },
    },
    urgencyMultipliers: {
        standard: { name: "Standard", multiplier: 1.0, timeline: "3-6 months" },
        expedited: {
            name: "Expedited",
            multiplier: 1.4,
            timeline: "2-3 months",
        },
        rush: { name: "Rush", multiplier: 1.8, timeline: "Under 2 months" },
    },
    serviceScopeAddons: {
        basic_dd: {
            name: "Basic DD",
            fee: 0,
            description: "Financial & legal review",
        },
        full_dd: {
            name: "Full DD",
            fee: 15000,
            description: "Comprehensive workstreams",
        },
        strategic_dd: {
            name: "Strategic DD",
            fee: 25000,
            description: "Commercial & market focus",
        },
        regulatory_dd: {
            name: "Regulatory DD",
            fee: 20000,
            description: "Compliance & risk focus",
        },
    },
    packages: {
        essentials: {
            name: "Essentials",
            price: "AED 15K+",
            description: "Basic DD Support",
            features: [
                "Financial DD checklists",
                "Legal compliance review",
                "Basic data room setup",
                "Risk assessment framework",
            ],
            ideal_for: "Small transactions, straightforward deals",
        },
        professional: {
            name: "Professional",
            price: "AED 35K+",
            description: "Full DD + Valuation",
            features: [
                "Comprehensive DD management",
                "Business valuation analysis",
                "Transaction modeling",
                "UAE regulatory guidance",
            ],
            ideal_for: "Standard M&A transactions, mid-market deals",
        },
        enterprise: {
            name: "Enterprise",
            price: "AED 75K+",
            description: "Strategic Advisory",
            features: [
                "Strategic transaction advice",
                "Market intelligence reports",
                "Deal structuring optimization",
                "Integration planning",
            ],
            ideal_for: "Complex transactions, strategic acquisitions",
        },
        premium: {
            name: "Premium",
            price: "AED 150K+",
            description: "End-to-End M&A",
            features: [
                "Full M&A project management",
                "Dedicated deal team",
                "Cross-border expertise",
                "Post-transaction support",
            ],
            ideal_for: "Large-scale M&A, multi-jurisdictional deals",
        },
    },
    documents: {
        acquisition: [
            "Strategic acquisition plan",
            "Target evaluation matrix",
            "Deal structure proposal",
            "Integration roadmap",
            "Financing options analysis",
        ],
        divestiture: [
            "Information memorandum",
            "Data room checklist",
            "Vendor DD package",
            "Buyer engagement strategy",
            "Transaction timeline",
        ],
        valuation: [
            "Financial model",
            "Valuation report",
            "Market analysis",
            "Comparable transactions",
            "Executive summary",
        ],
        dd_support: [
            "DD workstream plan",
            "Risk assessment matrix",
            "Data room index",
            "DD findings report",
            "Management presentation",
        ],
    },
    timelines: {
        acquisition: {
            planning: "2-4 weeks",
            execution: "3-4 months",
            integration: "6-12 months",
        },
        divestiture: {
            preparation: "4-6 weeks",
            marketing: "2-3 months",
            execution: "1-2 months",
        },
        valuation: {
            analysis: "2-3 weeks",
            reporting: "1 week",
        },
        dd_support: {
            setup: "1-2 weeks",
            execution: "4-8 weeks",
            reporting: "1-2 weeks",
        },
    },
    industryExpertise: [
        "Real estate and hospitality",
        "Healthcare and life sciences",
        "Technology and fintech",
        "Energy and infrastructure",
        "Manufacturing and trading",
        "Professional services",
    ],
    regulatoryFrameworks: [
        "UAE Securities & Commodities Authority (SCA)",
        "ADGM/DIFC cross-border frameworks",
        "Foreign investment approvals",
        "Competition law and merger control",
        "Double taxation treaties",
        "International finance regulations",
    ],
    successMetrics: {
        transactionsCompleted: "100+",
        completionRate: "95%",
        valuationsDelivered: "50+",
        marketExperience: "Since 2019",
        averageTimeframe: "4-6 months",
        clientSatisfaction: "98%",
    },
};

// Cost Calculator Functions
function initializeCostCalculator() {
    const businessTypeSelect = document.getElementById("business-type");
    const licenseActivitySelect = document.getElementById("license-activity");
    const visaCountSlider = document.getElementById("visa-count");
    const visaCountDisplay = document.getElementById("visa-count-display");
    const officeTypeButtons = document.querySelectorAll(".office-type-btn");
    const getQuoteButton = document.getElementById("get-detailed-quote");

    if (!businessTypeSelect) return;

    // Initialize calculator
    updateCostCalculation();

    // Event listeners
    businessTypeSelect.addEventListener("change", updateCostCalculation);
    licenseActivitySelect.addEventListener("change", updateCostCalculation);
    visaCountSlider.addEventListener("input", function () {
        visaCountDisplay.textContent = this.value;
        updateCostCalculation();
    });

    // Office type selection
    officeTypeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            officeTypeButtons.forEach((btn) => btn.classList.remove("active"));
            this.classList.add("active");
            updateCostCalculation();
        });
    });

    // Get quote button
    if (getQuoteButton) {
        getQuoteButton.addEventListener("click", handleGetDetailedQuote);
    }
}

function updateCostCalculation() {
    const businessType = document.getElementById("business-type")?.value;
    const licenseActivity = document.getElementById("license-activity")?.value;
    const visaCount = parseInt(
        document.getElementById("visa-count")?.value || 0
    );
    const activeOfficeBtn = document.querySelector(".office-type-btn.active");
    const officeType = activeOfficeBtn?.dataset.type || "flexi";

    if (!businessType || !licenseActivity) return;

    // Calculate costs
    const govtFees =
        costCalculatorData.government[businessType][licenseActivity];
    const serviceFees =
        costCalculatorData.service[businessType][licenseActivity];
    const officeCosts = costCalculatorData.office[businessType][officeType];
    const visaCosts = costCalculatorData.visa[businessType] * visaCount;
    const totalCost = govtFees + serviceFees + officeCosts + visaCosts;
    const timeline = costCalculatorData.timeline[businessType];

    // Update display
    document.getElementById(
        "govt-fees"
    ).textContent = `AED ${govtFees.toLocaleString()}`;
    document.getElementById(
        "service-fees"
    ).textContent = `AED ${serviceFees.toLocaleString()}`;
    document.getElementById(
        "office-costs"
    ).textContent = `AED ${officeCosts.toLocaleString()}`;
    document.getElementById(
        "visa-costs"
    ).textContent = `AED ${visaCosts.toLocaleString()}`;
    document.getElementById(
        "total-cost"
    ).textContent = `AED ${totalCost.toLocaleString()}`;
    document.getElementById("timeline-estimate").textContent = timeline;

    // Track calculation
    trackEvent("cost_calculation", {
        business_type: businessType,
        license_activity: licenseActivity,
        visa_count: visaCount,
        office_type: officeType,
        total_cost: totalCost,
    });
}

function handleGetDetailedQuote() {
    const email = document.getElementById("calculator-email").value;
    const businessType = document.getElementById("business-type").value;
    const licenseActivity = document.getElementById("license-activity").value;
    const visaCount = document.getElementById("visa-count").value;
    const activeOfficeBtn = document.querySelector(".office-type-btn.active");
    const officeType = activeOfficeBtn?.dataset.type || "flexi";

    if (!email) {
        alert("Please enter your email address to receive the detailed quote.");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Simulate quote request (replace with actual API call)
    const button = document.getElementById("get-detailed-quote");
    const originalText = button.innerHTML;
    button.innerHTML =
        '<i data-lucide="loader-2" class="w-5 h-5 mr-2 animate-spin"></i>Sending...';
    button.disabled = true;

    setTimeout(() => {
        alert(
            `Thank you! We've sent a detailed quote for ${businessType.toUpperCase()} ${licenseActivity} setup to ${email}. Our team will contact you within 2 hours during UAE business hours.`
        );

        // Track quote request
        trackEvent("quote_request", {
            email: email,
            business_type: businessType,
            license_activity: licenseActivity,
            visa_count: visaCount,
            office_type: officeType,
        });

        // Reset form
        document.getElementById("calculator-email").value = "";
        button.innerHTML = originalText;
        button.disabled = false;

        // Reinitialize icons
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
    }, 2000);
}

// Regulation Updates Data
const regulationUpdatesData = [
    {
        id: 1,
        date: "2024-08-20",
        title: "Corporate Tax Return Filing Deadline Extended",
        category: "corporate-tax",
        impact: "medium",
        summary:
            "UAE Corporate Tax deadline extended to September 30, 2024 for qualifying taxpayers.",
        details:
            "The UAE Federal Tax Authority has announced an extension of the Corporate Tax return filing deadline for taxpayers whose first financial year began before June 1, 2023.",
        source: "UAE Federal Tax Authority",
    },
    {
        id: 2,
        date: "2024-08-18",
        title: "New DIFC Employment Law Amendments",
        category: "licensing",
        impact: "high",
        summary:
            "Significant changes to DIFC employment regulations affecting visa processing and employee benefits.",
        details:
            "The Dubai International Financial Centre Authority has introduced new employment law amendments that streamline visa processing and enhance employee protection measures.",
        source: "DIFC Authority",
    },
    {
        id: 3,
        date: "2024-08-15",
        title: "VAT Registration Threshold Updates",
        category: "vat",
        impact: "medium",
        summary:
            "Mandatory VAT registration threshold remains at AED 375,000 with new compliance guidelines.",
        details:
            "The Federal Tax Authority has clarified VAT registration requirements and introduced new digital compliance tools for small and medium enterprises.",
        source: "UAE Federal Tax Authority",
    },
    {
        id: 4,
        date: "2024-08-12",
        title: "Golden Visa Eligibility Expansion",
        category: "visas",
        impact: "high",
        summary:
            "UAE expands Golden Visa eligibility to include more professional categories and reduces investment thresholds.",
        details:
            "The UAE government has expanded Golden Visa eligibility to include skilled professionals in healthcare, education, and technology sectors with reduced investment requirements.",
        source: "UAE Immigration Authority",
    },
    {
        id: 5,
        date: "2024-08-10",
        title: "Digital Banking Licenses for Free Zones",
        category: "banking",
        impact: "medium",
        summary:
            "Central Bank announces digital banking license framework for UAE free zone companies.",
        details:
            "The UAE Central Bank has introduced a new regulatory framework allowing eligible free zone companies to apply for digital banking licenses with simplified requirements.",
        source: "UAE Central Bank",
    },
    {
        id: 6,
        date: "2024-08-08",
        title: "ESR Filing Deadline Reminder",
        category: "licensing",
        impact: "high",
        summary:
            "Economic Substance Regulation annual filings due by December 31, 2024.",
        details:
            "Companies subject to ESR requirements must submit their annual Economic Substance Reports by December 31, 2024. Late submissions may result in penalties.",
        source: "UAE Ministry of Economy",
    },
    {
        id: 7,
        date: "2024-08-05",
        title: "ADGM Court Fee Structure Revised",
        category: "licensing",
        impact: "low",
        summary:
            "Abu Dhabi Global Market announces revised court fee structure effective September 1, 2024.",
        details:
            "ADGM Courts have introduced a new fee structure for commercial disputes and simplified procedures for small claims under AED 100,000.",
        source: "ADGM Authority",
    },
    {
        id: 8,
        date: "2024-08-03",
        title: "Cryptocurrency Regulation Updates",
        category: "licensing",
        impact: "high",
        summary:
            "UAE Securities and Commodities Authority releases new guidelines for crypto asset service providers.",
        details:
            "New comprehensive regulations for cryptocurrency exchanges, wallet providers, and digital asset custodians operating in the UAE mainland and free zones.",
        source: "UAE Securities and Commodities Authority",
    },
    {
        id: 9,
        date: "2024-08-01",
        title: "E-commerce License Simplification",
        category: "licensing",
        impact: "medium",
        summary:
            "Dubai Economy streamlines e-commerce license application process with new digital platform.",
        details:
            "Dubai Department of Economy and Tourism launches new digital platform for e-commerce license applications with 24-hour approval for qualifying businesses.",
        source: "Dubai Department of Economy and Tourism",
    },
    {
        id: 10,
        date: "2024-07-30",
        title: "Free Zone Salary Certificate Requirements",
        category: "visas",
        impact: "medium",
        summary:
            "Updated salary certificate requirements for free zone employee visa renewals.",
        details:
            "UAE immigration authorities have updated salary certificate requirements for free zone companies processing employee visa renewals and new applications.",
        source: "UAE Immigration Authority",
    },
];

// Regulation Updates Functions
function initializeRegulationUpdates() {
    populateRegulationTicker();
    populateRegulationUpdatesGrid();
    initializeRegulationFilters();
    initializeNewsletterSignup();
}

function populateRegulationTicker() {
    const ticker = document.getElementById("regulation-ticker");
    if (!ticker) return;

    const tickerItems = regulationUpdatesData
        .slice(0, 5)
        .map(
            (update) =>
                `<span class="mx-8">📋 ${update.title} - ${formatDate(
                    update.date
                )}</span>`
        )
        .join("");

    ticker.innerHTML = tickerItems;
}

function populateRegulationUpdatesGrid(filter = "all") {
    const grid = document.getElementById("regulation-updates-grid");
    if (!grid) return;

    const filteredUpdates =
        filter === "all"
            ? regulationUpdatesData.slice(0, 3)
            : regulationUpdatesData
                  .filter((update) => update.category === filter)
                  .slice(0, 3);

    const updatesHTML = filteredUpdates
        .map(
            (update) => `
        <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer update-card impact-${
            update.impact
        }" data-id="${update.id}">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-2">
                    <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">${getCategoryDisplay(
                        update.category
                    )}</span>
                    <span class="px-2 py-1 ${getImpactColor(
                        update.impact
                    )} text-xs rounded-full">${update.impact.toUpperCase()}</span>
                </div>
                <span class="text-sm text-gray-500">${formatDate(
                    update.date
                )}</span>
            </div>
            
            <h3 class="text-lg font-bold mb-3 text-gray-800">${
                update.title
            }</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">${
                update.summary
            }</p>
            
            <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Source: ${
                    update.source
                }</span>
                <button class="text-custom-600 text-sm font-medium hover:text-custom-700">Read More</button>
            </div>
        </div>
    `
        )
        .join("");

    grid.innerHTML = updatesHTML;

    // Add click handlers for update cards
    document.querySelectorAll(".update-card").forEach((card) => {
        card.addEventListener("click", function () {
            const updateId = parseInt(this.dataset.id);
            showUpdateDetails(updateId);
        });
    });
}

function initializeRegulationFilters() {
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Update active state
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
                btn.classList.add("border-gray-300", "text-gray-700");
                btn.classList.remove(
                    "bg-custom-600",
                    "text-white",
                    "border-custom-600"
                );
            });

            this.classList.add("active");
            this.classList.remove("border-gray-300", "text-gray-700");
            this.classList.add(
                "bg-custom-600",
                "text-white",
                "border-custom-600"
            );

            // Filter updates
            const category = this.dataset.category;
            populateRegulationUpdatesGrid(category);

            // Track filter usage
            trackEvent("regulation_filter", { category: category });
        });
    });
}

function initializeNewsletterSignup() {
    const subscribeButton = document.getElementById("subscribe-updates");

    if (subscribeButton) {
        subscribeButton.addEventListener("click", function () {
            const email = document.getElementById("newsletter-email").value;

            if (!email) {
                alert("Please enter your email address.");
                return;
            }

            if (!isValidEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            // Simulate subscription (replace with actual API call)
            const originalText = this.innerHTML;
            this.innerHTML = "Subscribing...";
            this.disabled = true;

            setTimeout(() => {
                alert(
                    `Thank you! You've been subscribed to UAE regulation updates at ${email}.`
                );
                document.getElementById("newsletter-email").value = "";
                this.innerHTML = originalText;
                this.disabled = false;

                // Track subscription
                trackEvent("newsletter_signup", {
                    email: email,
                    source: "regulation_updates",
                });
            }, 1500);
        });
    }
}

// Helper functions for regulation updates
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function getCategoryDisplay(category) {
    const categoryMap = {
        "corporate-tax": "Corporate Tax",
        vat: "VAT",
        licensing: "Licensing",
        banking: "Banking",
        visas: "Visas",
    };
    return categoryMap[category] || category;
}

function getImpactColor(impact) {
    const colorMap = {
        high: "bg-red-100 text-red-800",
        medium: "bg-orange-100 text-orange-800",
        low: "bg-green-100 text-green-800",
    };
    return colorMap[impact] || "bg-gray-100 text-gray-800";
}

function showUpdateDetails(updateId) {
    const update = regulationUpdatesData.find((u) => u.id === updateId);
    if (!update) return;

    alert(
        `${update.title}\n\n${update.details}\n\nSource: ${
            update.source
        }\nDate: ${formatDate(update.date)}`
    );

    // Track update view
    trackEvent("regulation_update_view", {
        update_id: updateId,
        title: update.title,
        category: update.category,
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Consent banner
function initializeConsentBanner() {
    const consentBanner = document.getElementById("consent-banner");
    const acceptButton = consentBanner?.querySelector("button");

    // Check if consent was already given
    if (localStorage.getItem("consent-accepted") === "true") {
        consentBanner?.remove();
        return;
    }

    // Accept button click handler
    if (acceptButton) {
        acceptButton.addEventListener("click", function () {
            localStorage.setItem("consent-accepted", "true");
            consentBanner.style.transform = "translateY(-100%)";
            setTimeout(() => consentBanner?.remove(), 300);
        });
    }
}

// Contact form
function initializeContactForm() {
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    }
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Add loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Sending...";
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        alert(
            "Thank you for your message! We'll respond within 4 hours during UAE business hours."
        );
        form.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Track form submission (replace with actual analytics)
        console.log("Form submitted:", data);
    }, 1500);
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });
}

// Animation on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-fade-in");
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        ".service-card, .card, section"
    );
    animatedElements.forEach((element) => {
        observer.observe(element);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

// Analytics and tracking (replace with actual analytics service)
function trackEvent(eventName, eventData = {}) {
    console.log("Event tracked:", eventName, eventData);

    // Example: Google Analytics 4
    // gtag('event', eventName, eventData);

    // Example: Facebook Pixel
    // fbq('track', eventName, eventData);
}

// CTA button click handlers
document.addEventListener("click", function (e) {
    const ctaButton = e.target.closest("[data-gtm]");
    if (ctaButton) {
        const eventName = ctaButton.getAttribute("data-gtm");
        trackEvent("cta_click", {
            button_id: eventName,
            page_location: window.location.href,
        });
    }
});

// Window resize handler
window.addEventListener(
    "resize",
    debounce(function () {
        // Handle responsive adjustments if needed
        console.log("Window resized:", window.innerWidth);
    }, 300)
);

// Export functions for external use
window.AziendApp = {
    setTheme,
    trackEvent,
    servicesData,
    bankingData,
};

// Banking Calculator Functions
function initializeBankingCalculator() {
    const bankSelect = document.getElementById("bank-selection");
    const businessTypeSelect = document.getElementById("business-type-banking");
    const accountTypeSelect = document.getElementById("account-type");
    const turnoverSelect = document.getElementById("annual-turnover");
    const calculateButton = document.getElementById("calculate-banking-cost");

    if (!bankSelect) return; // Not on banking page

    // Populate bank options
    if (bankSelect) {
        const bankOptions = bankingData.calculatorOptions.banks
            .map((bank) => `<option value="${bank.id}">${bank.name}</option>`)
            .join("");
        bankSelect.innerHTML =
            '<option value="">Select a bank</option>' + bankOptions;
    }

    // Populate business type options
    if (businessTypeSelect) {
        const businessOptions = bankingData.calculatorOptions.businessTypes
            .map((type) => `<option value="${type.id}">${type.name}</option>`)
            .join("");
        businessTypeSelect.innerHTML =
            '<option value="">Select business type</option>' + businessOptions;
    }

    // Populate account type options
    if (accountTypeSelect) {
        const accountOptions = bankingData.calculatorOptions.accountTypes
            .map((type) => `<option value="${type.id}">${type.name}</option>`)
            .join("");
        accountTypeSelect.innerHTML =
            '<option value="">Select account type</option>' + accountOptions;
    }

    // Populate turnover options
    if (turnoverSelect) {
        const turnoverOptions = bankingData.calculatorOptions.turnoverRanges
            .map(
                (range) => `<option value="${range.id}">${range.name}</option>`
            )
            .join("");
        turnoverSelect.innerHTML =
            '<option value="">Select annual turnover</option>' +
            turnoverOptions;
    }

    // Calculate button event listener
    if (calculateButton) {
        calculateButton.addEventListener("click", calculateBankingCost);
    }

    // Auto-calculate on form changes
    [bankSelect, businessTypeSelect, accountTypeSelect, turnoverSelect].forEach(
        (element) => {
            if (element) {
                element.addEventListener("change", calculateBankingCost);
            }
        }
    );
}

function calculateBankingCost() {
    const bankId = document.getElementById("bank-selection")?.value;
    const businessType = document.getElementById(
        "business-type-banking"
    )?.value;
    const accountType = document.getElementById("account-type")?.value;
    const turnover = document.getElementById("annual-turnover")?.value;

    if (!bankId || !businessType || !accountType || !turnover) {
        // Clear results if incomplete
        updateBankingCostDisplay(null);
        return;
    }

    // Find selected options
    const selectedBank = bankingData.calculatorOptions.banks.find(
        (b) => b.id === bankId
    );
    const selectedTurnover = bankingData.calculatorOptions.turnoverRanges.find(
        (t) => t.id === turnover
    );

    if (!selectedBank || !selectedTurnover) return;

    // Calculate costs
    const basePricing =
        selectedBank.tier === "tier1"
            ? bankingData.pricingStructure.tier1Banks
            : bankingData.pricingStructure.tier2Banks;

    const setupFee = basePricing.setupFee;
    const relationshipFee = basePricing.relationshipFee;
    const accountTypeFee =
        bankingData.pricingStructure.accountTypeFees[accountType] || 0;
    const businessTypeFee =
        bankingData.pricingStructure.businessTypeFees[businessType] || 0;

    // Apply multipliers
    const complexityMultiplier = basePricing.complexityMultiplier;
    const turnoverMultiplier = selectedTurnover.multiplier;

    const subtotal =
        setupFee + relationshipFee + accountTypeFee + businessTypeFee;
    const totalCost = Math.round(
        subtotal * complexityMultiplier * turnoverMultiplier
    );

    // Get bank partner info
    const bankPartner = bankingData.bankPartners.find((bp) =>
        bp.name
            .toLowerCase()
            .includes(selectedBank.name.toLowerCase().split(" ")[0])
    );

    const result = {
        totalCost,
        breakdown: {
            setupFee,
            relationshipFee,
            accountTypeFee,
            businessTypeFee,
            multipliers: {
                complexity: complexityMultiplier,
                turnover: turnoverMultiplier,
            },
        },
        bankInfo: bankPartner || {
            name: selectedBank.name,
            successRate: 85,
            avgProcessingTime: "2-4 weeks",
            minInitialDeposit: 5000,
        },
        timeline: bankPartner?.avgProcessingTime || "2-4 weeks",
        successRate: bankPartner?.successRate || 85,
    };

    updateBankingCostDisplay(result);

    // Track calculation
    trackEvent("banking_cost_calculation", {
        bank: selectedBank.name,
        business_type: businessType,
        account_type: accountType,
        turnover: turnover,
        total_cost: totalCost,
    });
}

function updateBankingCostDisplay(result) {
    const resultSection = document.getElementById("banking-cost-result");
    if (!resultSection) return;

    if (!result) {
        resultSection.innerHTML = `
            <div class="text-center text-gray-500 py-8">
                <i data-lucide="calculator" class="w-12 h-12 mx-auto mb-4 text-gray-400"></i>
                <p>Select all options above to calculate your banking costs</p>
            </div>
        `;
        if (typeof lucide !== "undefined") lucide.createIcons();
        return;
    }

    resultSection.innerHTML = `
        <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
            <div class="text-center mb-6">
                <div class="text-3xl font-bold text-green-700 mb-2">AED ${result.totalCost.toLocaleString()}</div>
                <div class="text-green-600">Total Banking Setup Cost</div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                    <h4 class="font-semibold text-gray-800 mb-3">Cost Breakdown</h4>
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span>Setup Fee:</span>
                            <span>AED ${result.breakdown.setupFee.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Relationship Fee:</span>
                            <span>AED ${result.breakdown.relationshipFee.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Account Type Fee:</span>
                            <span>AED ${result.breakdown.accountTypeFee.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Business Type Fee:</span>
                            <span>AED ${result.breakdown.businessTypeFee.toLocaleString()}</span>
                        </div>
                        <hr class="my-2">
                        <div class="flex justify-between font-medium">
                            <span>Total (incl. multipliers):</span>
                            <span>AED ${result.totalCost.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="space-y-4">
                    <h4 class="font-semibold text-gray-800 mb-3">Bank Information</h4>
                    <div class="space-y-3 text-sm">
                        <div class="flex items-center justify-between">
                            <span>Success Rate:</span>
                            <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                ${result.successRate}%
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span>Processing Time:</span>
                            <span class="font-medium">${result.timeline}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Min. Initial Deposit:</span>
                            <span class="font-medium">AED ${
                                result.bankInfo.minInitialDeposit?.toLocaleString() ||
                                "5,000"
                            }</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 pt-4 border-t border-green-200">
                <button onclick="requestBankingQuote()" class="w-full bg-aziend-yellow hover:bg-yellow-400 text-aziend-dark font-semibold py-3 px-6 rounded-lg transition-colors">
                    Get Detailed Banking Quote
                </button>
            </div>
        </div>
    `;

    if (typeof lucide !== "undefined") lucide.createIcons();
}

function requestBankingQuote() {
    const bankId = document.getElementById("bank-selection")?.value;
    const businessType = document.getElementById(
        "business-type-banking"
    )?.value;
    const accountType = document.getElementById("account-type")?.value;
    const turnover = document.getElementById("annual-turnover")?.value;

    if (!bankId || !businessType || !accountType || !turnover) {
        // Show friendly notification
        showNotification(
            "Please complete the calculator first to request a quote.",
            "warning"
        );
        return;
    }

    // Scroll to contact form or show quote modal
    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });

        // Pre-fill contact form if available
        setTimeout(() => {
            const messageField =
                document.getElementById("quote-message") ||
                document.getElementById("message");
            if (messageField) {
                const selectedBank = bankingData.calculatorOptions.banks.find(
                    (b) => b.id === bankId
                );
                messageField.value = `I'm interested in a detailed banking quote for ${
                    selectedBank?.name || "selected bank"
                } account opening. Business Type: ${businessType}, Account Type: ${accountType}, Annual Turnover: ${turnover}.`;
                messageField.focus();
            }

            // Show success notification
            showNotification(
                "Quote request form prepared. Please provide your contact details below.",
                "success"
            );
        }, 1000);
    }

    trackEvent("banking_quote_request", {
        bank: bankId,
        business_type: businessType,
        account_type: accountType,
        turnover: turnover,
    });
}

// Utility function to show notifications
function showNotification(message, type = "info") {
    // Create notification element if it doesn't exist
    let notification = document.getElementById("notification-toast");
    if (!notification) {
        notification = document.createElement("div");
        notification.id = "notification-toast";
        notification.className =
            "fixed top-4 right-4 z-50 transform translate-x-full transition-transform duration-300";
        document.body.appendChild(notification);
    }

    // Set notification content and style
    const colors = {
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
    };

    notification.innerHTML = `
        <div class="flex items-center space-x-3 ${
            colors[type] || colors.info
        } px-6 py-4 rounded-lg shadow-lg max-w-sm">
            <i data-lucide="${
                type === "success"
                    ? "check-circle"
                    : type === "warning"
                    ? "alert-triangle"
                    : type === "error"
                    ? "x-circle"
                    : "info"
            }" class="w-5 h-5"></i>
            <span class="text-sm font-medium">${message}</span>
            <button onclick="hideNotification()" class="ml-auto">
                <i data-lucide="x" class="w-4 h-4"></i>
            </button>
        </div>
    `;

    // Initialize icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Show notification
    setTimeout(() => {
        notification.classList.remove("translate-x-full");
        notification.classList.add("translate-x-0");
    }, 100);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification();
    }, 5000);
}

function hideNotification() {
    const notification = document.getElementById("notification-toast");
    if (notification) {
        notification.classList.remove("translate-x-0");
        notification.classList.add("translate-x-full");
    }
}

// Initialize banking calculator when page loads
document.addEventListener("DOMContentLoaded", function () {
    // Check if we're on the banking page
    if (window.location.pathname.includes("banking-treasury")) {
        initializeBankingCalculator();
    }

    // Check if we're on the accounting page
    if (window.location.pathname.includes("accounting-payroll-wps")) {
        initializeAccountingCalculator();
    }

    // Check if we're on the corporate governance page
    if (window.location.pathname.includes("corporate-governance-policies")) {
        initializeGovernanceCalculator();
    }

    // Check if we're on the M&A page
    if (window.location.pathname.includes("ma-dd-valuations")) {
        initializeMaCalculator();
    }
});

// Corporate Governance Calculator Functions
function initializeGovernanceCalculator() {
    const serviceTypeSelect = document.getElementById("governanceServiceType");
    const companyComplexitySelect =
        document.getElementById("companyComplexity");
    const boardSlider = document.getElementById("boardSlider");
    const boardSize = document.getElementById("boardSize");
    const frequencyButtons = document.querySelectorAll(
        ".governance-frequency-btn"
    );
    const complianceLevelSelect = document.getElementById(
        "governanceComplianceLevel"
    );

    if (!serviceTypeSelect) return; // Not on governance page

    // Board size slider handler
    if (boardSlider && boardSize) {
        boardSlider.addEventListener("input", function () {
            const value = this.value;
            boardSize.textContent =
                value >= 15 ? "15+ directors" : `${value} directors`;
            calculateGovernanceCosts();
        });
    }

    // Frequency button handlers
    frequencyButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            frequencyButtons.forEach((b) => {
                b.classList.remove(
                    "active",
                    "border-custom-600",
                    "bg-custom-600",
                    "text-white"
                );
                b.classList.add("border-gray-200");
            });
            this.classList.add(
                "active",
                "border-custom-600",
                "bg-custom-600",
                "text-white"
            );
            this.classList.remove("border-gray-200");
            calculateGovernanceCosts();
        });
    });

    // Service type, complexity, and compliance level handlers
    [serviceTypeSelect, companyComplexitySelect, complianceLevelSelect].forEach(
        (element) => {
            if (element) {
                element.addEventListener("change", calculateGovernanceCosts);
            }
        }
    );

    // Set quarterly as default
    const quarterlyBtn = document.querySelector('[data-frequency="quarterly"]');
    if (quarterlyBtn) {
        quarterlyBtn.click();
    }
}

function calculateGovernanceCosts() {
    const serviceType = document.getElementById("governanceServiceType")?.value;
    const companyComplexity =
        document.getElementById("companyComplexity")?.value;
    const boardSizeCount =
        parseInt(document.getElementById("boardSlider")?.value) || 5;
    const frequency =
        document.querySelector(".governance-frequency-btn.active")?.dataset
            .frequency || "quarterly";
    const complianceLevel = document.getElementById(
        "governanceComplianceLevel"
    )?.value;

    if (!serviceType) {
        // Clear results if no service type selected
        updateGovernanceCostDisplay(null);
        return;
    }

    // Get service data
    const serviceData = governanceData.services[serviceType];
    if (!serviceData) return;

    // Calculate base costs
    let baseFee = serviceData.basePrice;
    let complexityFee = 0;
    let boardSizeFee = Math.max(
        0,
        (boardSizeCount - 3) * serviceData.directorCostPerQuarter
    ); // First 3 directors included
    let complianceFee = governanceData.complianceAddons[complianceLevel] || 0;

    // Apply complexity multiplier
    const complexityMultiplier =
        governanceData.complexityMultipliers[companyComplexity] || 1;
    complexityFee = baseFee * (complexityMultiplier - 1);

    // Apply frequency multiplier
    const frequencyMultiplier =
        governanceData.frequencyMultipliers[frequency] || 1;

    // Apply board size threshold multiplier
    let boardMultiplier = 1;
    const thresholds = governanceData.boardSizeThresholds;
    if (boardSizeCount > 9) {
        boardMultiplier = thresholds.large.multiplier;
    } else if (boardSizeCount > 5) {
        boardMultiplier = thresholds.medium.multiplier;
    } else {
        boardMultiplier = thresholds.small.multiplier;
    }

    // Calculate final costs
    const subtotal =
        (baseFee + complexityFee + boardSizeFee + complianceFee) *
        boardMultiplier;
    const quarterlyTotal = Math.round(subtotal * frequencyMultiplier);

    const result = {
        baseFee,
        complexityFee,
        boardSizeFee,
        complianceFee,
        quarterlyTotal,
        serviceData,
        timeline: governanceData.timelines[serviceType],
        documents: governanceData.documents[serviceType] || [],
        frequency,
        boardSizeCount,
        companyComplexity,
    };

    updateGovernanceCostDisplay(result);

    // Track calculation
    trackEvent("governance_cost_calculation", {
        service_type: serviceType,
        company_complexity: companyComplexity,
        board_size: boardSizeCount,
        frequency: frequency,
        compliance_level: complianceLevel,
        total_cost: quarterlyTotal,
    });
}

function updateGovernanceCostDisplay(result) {
    // Update cost breakdown
    const baseFeeElement = document.getElementById("governanceBaseFee");
    const complexityFeeElement = document.getElementById("complexityFee");
    const boardSizeFeeElement = document.getElementById("boardSizeFee");
    const complianceFeeElement = document.getElementById(
        "governanceComplianceFee"
    );
    const quarterlyTotalElement = document.getElementById(
        "governanceQuarterlyTotal"
    );

    if (baseFeeElement)
        baseFeeElement.textContent = `AED ${
            result ? result.baseFee.toLocaleString() : "0"
        }`;
    if (complexityFeeElement)
        complexityFeeElement.textContent = `AED ${
            result ? result.complexityFee.toLocaleString() : "0"
        }`;
    if (boardSizeFeeElement)
        boardSizeFeeElement.textContent = `AED ${
            result ? result.boardSizeFee.toLocaleString() : "0"
        }`;
    if (complianceFeeElement)
        complianceFeeElement.textContent = `AED ${
            result ? result.complianceFee.toLocaleString() : "0"
        }`;
    if (quarterlyTotalElement)
        quarterlyTotalElement.textContent = `AED ${
            result ? result.quarterlyTotal.toLocaleString() : "0"
        }`;

    // Update timeline
    updateGovernanceTimeline(
        result?.serviceData?.name || null,
        result?.timeline
    );

    // Update documents list
    updateGovernanceDocuments(result?.documents || []);

    // Update governance maturity
    updateGovernanceMaturity(result?.companyComplexity || null);
}

function updateGovernanceTimeline(serviceName, timeline) {
    const timelineElement = document.getElementById("governanceTimeline");
    if (!timelineElement) return;

    if (!serviceName || !timeline) {
        timelineElement.innerHTML = `
            <div class="flex items-center justify-between">
                <span>Setup Duration:</span>
                <span class="font-semibold">Select service for timeline</span>
            </div>
        `;
        return;
    }

    timelineElement.innerHTML = `
        <div class="space-y-2">
            <div class="flex items-center justify-between">
                <span>Setup Duration:</span>
                <span class="font-semibold">${timeline.setup || timeline}</span>
            </div>
            <div class="flex items-center justify-between">
                <span>Implementation:</span>
                <span class="font-semibold text-blue-600">${
                    timeline.fullImplementation ||
                    timeline.implementation ||
                    "Varies by service"
                }</span>
            </div>
        </div>
    `;
}

function updateGovernanceDocuments(documents) {
    const documentsListElement = document.getElementById(
        "governanceDocumentsList"
    );
    if (!documentsListElement) return;

    if (!documents.length) {
        documentsListElement.innerHTML = `
            <li class="flex items-center">
                <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                Select service to see requirements
            </li>
        `;
        return;
    }

    documentsListElement.innerHTML = documents
        .map(
            (doc) => `
            <li class="flex items-center">
                <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                ${doc}
            </li>
        `
        )
        .join("");

    // Re-initialize icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

function updateGovernanceMaturity(complexity) {
    const maturityElement = document.getElementById("governanceMaturity");
    if (!maturityElement) return;

    const maturityLevels = {
        simple: {
            level: "Basic",
            color: "text-yellow-600",
            description: "Foundational governance",
        },
        standard: {
            level: "Developing",
            color: "text-blue-600",
            description: "Standard practices",
        },
        complex: {
            level: "Advanced",
            color: "text-green-600",
            description: "Sophisticated framework",
        },
        listed: {
            level: "Mature",
            color: "text-purple-600",
            description: "Best-in-class governance",
        },
    };

    const maturity = maturityLevels[complexity];

    if (!maturity) {
        maturityElement.innerHTML = `
            <div class="flex items-center justify-between">
                <span>Current Level:</span>
                <span class="font-semibold">Assessment needed</span>
            </div>
        `;
        return;
    }

    maturityElement.innerHTML = `
        <div class="space-y-2">
            <div class="flex items-center justify-between">
                <span>Current Level:</span>
                <span class="font-semibold ${maturity.color}">${maturity.level}</span>
            </div>
            <div class="text-xs">
                ${maturity.description}
            </div>
        </div>
    `;
}

// Accounting Calculator Functions
function initializeAccountingCalculator() {
    const serviceTypeSelect = document.getElementById("serviceType");
    const employeeSlider = document.getElementById("employeeSlider");
    const employeeCount = document.getElementById("employeeCount");
    const frequencyButtons = document.querySelectorAll(".frequency-btn");
    const complianceLevelSelect = document.getElementById("complianceLevel");

    if (!serviceTypeSelect) return; // Not on accounting page

    // Employee slider handler
    if (employeeSlider && employeeCount) {
        employeeSlider.addEventListener("input", function () {
            const value = this.value;
            employeeCount.textContent =
                value >= 500 ? "500+ employees" : `${value} employees`;
            calculateAccountingCosts();
        });
    }

    // Frequency button handlers
    frequencyButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            frequencyButtons.forEach((b) => {
                b.classList.remove(
                    "active",
                    "border-custom-600",
                    "bg-custom-600",
                    "text-white"
                );
                b.classList.add("border-gray-200");
            });
            this.classList.add(
                "active",
                "border-custom-600",
                "bg-custom-600",
                "text-white"
            );
            this.classList.remove("border-gray-200");
            calculateAccountingCosts();
        });
    });

    // Service type and compliance level handlers
    [serviceTypeSelect, complianceLevelSelect].forEach((element) => {
        if (element) {
            element.addEventListener("change", calculateAccountingCosts);
        }
    });

    // Set monthly as default
    const monthlyBtn = document.querySelector('[data-frequency="monthly"]');
    if (monthlyBtn) {
        monthlyBtn.click();
    }
}

function calculateAccountingCosts() {
    const serviceType = document.getElementById("serviceType")?.value;
    const employeeCount =
        parseInt(document.getElementById("employeeSlider")?.value) || 10;
    const frequency =
        document.querySelector(".frequency-btn.active")?.dataset.frequency ||
        "monthly";
    const complianceLevel = document.getElementById("complianceLevel")?.value;

    if (!serviceType) {
        // Clear results if no service type selected
        updateAccountingCostDisplay(null);
        return;
    }

    // Get service data
    const serviceData = accountingData.services[serviceType];
    if (!serviceData) return;

    // Calculate base costs
    let baseFee = serviceData.basePrice;
    let employeeCost = Math.max(
        0,
        (employeeCount - 5) * serviceData.employeeCostPerMonth
    ); // First 5 employees included
    let complianceCost = accountingData.complianceAddons[complianceLevel] || 0;

    // Apply frequency multiplier
    const frequencyMultiplier =
        accountingData.frequencyMultipliers[frequency] || 1;

    // Apply employee threshold multiplier
    let employeeMultiplier = 1;
    const thresholds = accountingData.employeeThresholds;
    if (employeeCount > 200) {
        employeeMultiplier = thresholds.enterprise.multiplier;
    } else if (employeeCount > 50) {
        employeeMultiplier = thresholds.large.multiplier;
    } else if (employeeCount > 10) {
        employeeMultiplier = thresholds.medium.multiplier;
    } else {
        employeeMultiplier = thresholds.small.multiplier;
    }

    // Calculate final costs
    const subtotal =
        (baseFee + employeeCost + complianceCost) * employeeMultiplier;
    const monthlyTotal = Math.round(subtotal * frequencyMultiplier);

    const result = {
        baseFee,
        employeeCost,
        complianceCost,
        monthlyTotal,
        serviceData,
        timeline: accountingData.timelines[serviceType],
        documents: accountingData.documents[serviceType] || [],
        frequency,
        employeeCount,
    };

    updateAccountingCostDisplay(result);

    // Track calculation
    trackEvent("accounting_cost_calculation", {
        service_type: serviceType,
        employee_count: employeeCount,
        frequency: frequency,
        compliance_level: complianceLevel,
        total_cost: monthlyTotal,
    });
}

function updateAccountingCostDisplay(result) {
    // Update cost breakdown
    const baseFeeElement = document.getElementById("baseFee");
    const employeeCostElement = document.getElementById("employeeCost");
    const complianceCostElement = document.getElementById("complianceCost");
    const monthlyTotalElement = document.getElementById("monthlyTotal");

    if (baseFeeElement)
        baseFeeElement.textContent = `AED ${
            result ? result.baseFee.toLocaleString() : "0"
        }`;
    if (employeeCostElement)
        employeeCostElement.textContent = `AED ${
            result ? result.employeeCost.toLocaleString() : "0"
        }`;
    if (complianceCostElement)
        complianceCostElement.textContent = `AED ${
            result ? result.complianceCost.toLocaleString() : "0"
        }`;
    if (monthlyTotalElement)
        monthlyTotalElement.textContent = `AED ${
            result ? result.monthlyTotal.toLocaleString() : "0"
        }`;

    // Update timeline
    updateAccountingTimeline(
        result?.serviceData?.name || null,
        result?.timeline
    );

    // Update documents list
    updateAccountingDocuments(result?.documents || []);
}

function updateAccountingTimeline(serviceName, timeline) {
    const timelineElement = document.getElementById("serviceTimeline");
    if (!timelineElement) return;

    if (!serviceName || !timeline) {
        timelineElement.innerHTML = `
            <div class="flex items-center justify-between">
                <span>Setup Duration:</span>
                <span class="font-semibold">Select service for timeline</span>
            </div>
        `;
        return;
    }

    timelineElement.innerHTML = `
        <div class="space-y-2">
            <div class="flex items-center justify-between">
                <span>Setup Duration:</span>
                <span class="font-semibold">${timeline.setup || timeline}</span>
            </div>
            <div class="flex items-center justify-between">
                <span>First Service:</span>
                <span class="font-semibold text-blue-600">${
                    timeline.firstService || "Within 48 hours"
                }</span>
            </div>
        </div>
    `;
}

function updateAccountingDocuments(documents) {
    const documentsListElement = document.getElementById("documentsList");
    if (!documentsListElement) return;

    if (!documents.length) {
        documentsListElement.innerHTML = `
            <li class="flex items-center">
                <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                Select service to see requirements
            </li>
        `;
        return;
    }

    documentsListElement.innerHTML = documents
        .map(
            (doc) => `
            <li class="flex items-center">
                <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>
                ${doc}
            </li>
        `
        )
        .join("");

    // Re-initialize icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

// Customs & Trade Data Structure
const customsData = {
    tradeTypes: {
        import: { baseFee: 2500, name: "Goods Import" },
        export: { baseFee: 2000, name: "Goods Export" },
        services: { baseFee: 1500, name: "Services" },
        "re-export": { baseFee: 3000, name: "Re-export" },
    },
    businessCategories: {
        trading: { multiplier: 1.0, name: "Trading" },
        manufacturing: { multiplier: 1.3, name: "Manufacturing" },
        ecommerce: { multiplier: 1.2, name: "E-commerce" },
        wholesale: { multiplier: 1.1, name: "Wholesale" },
    },
    volumeScales: {
        under100: { multiplier: 1.0, name: "Under 100 shipments" },
        "100-500": { multiplier: 1.2, name: "100-500 shipments" },
        "500-2000": { multiplier: 1.5, name: "500-2000 shipments" },
        "2000+": { multiplier: 2.0, name: "2000+ shipments" },
    },
    complexityLevels: {
        standard: { surcharge: 0, name: "Standard goods" },
        controlled: { surcharge: 1500, name: "Controlled items" },
        restricted: { surcharge: 3000, name: "Restricted goods" },
        hazardous: { surcharge: 5000, name: "Hazardous materials" },
    },
    additionalServices: {
        registration: { cost: 1500, name: "Importer/Exporter Registration" },
        originCerts: { cost: 800, name: "Origin Certificates" },
        dutyOptimization: { cost: 2000, name: "Duty Optimization" },
        expedited: { cost: 1200, name: "Expedited Processing" },
    },
    timelines: {
        import: "2-3 weeks",
        export: "2-3 weeks",
        services: "1-2 weeks",
        "re-export": "3-4 weeks",
    },
    deliverables: {
        import: [
            "Customs code classification",
            "Import license",
            "Trade documentation",
            "Duty calculation",
        ],
        export: [
            "Export license",
            "Origin certificates",
            "Commercial invoices",
            "Shipping coordination",
        ],
        services: [
            "Service registration",
            "Trade compliance",
            "Documentation support",
        ],
        "re-export": [
            "Re-export license",
            "Transit documentation",
            "Customs clearance",
            "Logistics coordination",
        ],
    },
};

// Initialize Customs Calculator
function initializeCustomsCalculator() {
    const tradeTypeSelect = document.getElementById("tradeType");
    const businessCategorySelect = document.getElementById("businessCategory");
    const volumeScaleSelect = document.getElementById("volumeScale");
    const complexityLevelSelect = document.getElementById("complexityLevel");

    // Add event listeners for all form elements
    if (tradeTypeSelect) {
        tradeTypeSelect.addEventListener("change", calculateCustomsCosts);
    }
    if (businessCategorySelect) {
        businessCategorySelect.addEventListener(
            "change",
            calculateCustomsCosts
        );
    }
    if (volumeScaleSelect) {
        volumeScaleSelect.addEventListener("change", calculateCustomsCosts);
    }
    if (complexityLevelSelect) {
        complexityLevelSelect.addEventListener("change", calculateCustomsCosts);
    }

    // Add event listeners for checkboxes
    const checkboxes = [
        "registrationService",
        "originCertsService",
        "dutyOptimizationService",
        "expeditedService",
    ];
    checkboxes.forEach((id) => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener("change", calculateCustomsCosts);
        }
    });

    // Initial calculation
    calculateCustomsCosts();
}

// Calculate Customs Costs
function calculateCustomsCosts() {
    const tradeType = document.getElementById("tradeType")?.value || "import";
    const businessCategory =
        document.getElementById("businessCategory")?.value || "trading";
    const volumeScale =
        document.getElementById("volumeScale")?.value || "under100";
    const complexityLevel =
        document.getElementById("complexityLevel")?.value || "standard";

    // Get base fee
    const baseFee = customsData.tradeTypes[tradeType]?.baseFee || 2500;

    // Get multipliers
    const categoryMultiplier =
        customsData.businessCategories[businessCategory]?.multiplier || 1.0;
    const volumeMultiplier =
        customsData.volumeScales[volumeScale]?.multiplier || 1.0;

    // Get complexity surcharge
    const complexitySurcharge =
        customsData.complexityLevels[complexityLevel]?.surcharge || 0;

    // Calculate additional services
    let additionalServicesCost = 0;
    const additionalServices = [];

    if (document.getElementById("registrationService")?.checked) {
        additionalServicesCost +=
            customsData.additionalServices.registration.cost;
        additionalServices.push(
            customsData.additionalServices.registration.name
        );
    }
    if (document.getElementById("originCertsService")?.checked) {
        additionalServicesCost +=
            customsData.additionalServices.originCerts.cost;
        additionalServices.push(
            customsData.additionalServices.originCerts.name
        );
    }
    if (document.getElementById("dutyOptimizationService")?.checked) {
        additionalServicesCost +=
            customsData.additionalServices.dutyOptimization.cost;
        additionalServices.push(
            customsData.additionalServices.dutyOptimization.name
        );
    }
    if (document.getElementById("expeditedService")?.checked) {
        additionalServicesCost += customsData.additionalServices.expedited.cost;
        additionalServices.push(customsData.additionalServices.expedited.name);
    }

    // Calculate total
    const subtotal =
        baseFee * categoryMultiplier * volumeMultiplier + complexitySurcharge;
    const totalCost = subtotal + additionalServicesCost;

    // Update display
    updateCustomsCostDisplay(
        baseFee,
        categoryMultiplier,
        volumeMultiplier,
        complexitySurcharge,
        additionalServicesCost,
        totalCost
    );
    updateCustomsTimeline(tradeType);
    updateCustomsDocuments(tradeType, additionalServices);
}

// Update Cost Display
function updateCustomsCostDisplay(
    baseFee,
    categoryMultiplier,
    volumeMultiplier,
    complexitySurcharge,
    additionalServicesCost,
    totalCost
) {
    const baseFeeElement = document.getElementById("baseFee");
    const categoryMultiplierElement =
        document.getElementById("categoryMultiplier");
    const volumeAdjustmentElement = document.getElementById("volumeAdjustment");
    const complexitySurchargeElement = document.getElementById(
        "complexitySurcharge"
    );
    const additionalServicesElement =
        document.getElementById("additionalServices");
    const totalCostElement = document.getElementById("totalCost");

    if (baseFeeElement) {
        baseFeeElement.textContent = `AED ${baseFee.toLocaleString()}`;
    }
    if (categoryMultiplierElement) {
        categoryMultiplierElement.textContent = `${categoryMultiplier}x`;
    }
    if (volumeAdjustmentElement) {
        volumeAdjustmentElement.textContent = `${volumeMultiplier}x`;
    }
    if (complexitySurchargeElement) {
        complexitySurchargeElement.textContent = `+AED ${complexitySurcharge.toLocaleString()}`;
    }
    if (additionalServicesElement) {
        additionalServicesElement.textContent = `+AED ${additionalServicesCost.toLocaleString()}`;
    }
    if (totalCostElement) {
        totalCostElement.textContent = `AED ${totalCost.toLocaleString()}`;
    }
}

// Update Timeline
function updateCustomsTimeline(tradeType) {
    const timelineElement = document.getElementById("estimatedTimeline");
    if (timelineElement) {
        const timeline = customsData.timelines[tradeType] || "2-4 weeks";
        timelineElement.textContent = timeline;
    }
}

// Update Documents/Deliverables
function updateCustomsDocuments(tradeType, additionalServices) {
    const deliverablesElement = document.getElementById("deliverables");
    if (!deliverablesElement) return;

    const baseDeliverables = customsData.deliverables[tradeType] || [
        "Customs code classification",
        "Trade documentation",
    ];
    const allDeliverables = [...baseDeliverables];

    // Add additional service deliverables
    if (additionalServices.includes("Origin Certificates")) {
        allDeliverables.push("Origin certificates processing");
    }
    if (additionalServices.includes("Duty Optimization")) {
        allDeliverables.push("Duty reduction strategies");
    }
    if (additionalServices.includes("Expedited Processing")) {
        allDeliverables.push("Priority clearance");
    }

    deliverablesElement.innerHTML = allDeliverables
        .slice(0, 4)
        .map(
            (deliverable) => `
        <div class="flex items-center text-sm text-gray-700">
            <i data-lucide="check" class="h-3 w-3 text-custom-600 mr-2"></i>
            <span>${deliverable}</span>
        </div>
    `
        )
        .join("");

    // Re-initialize icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}
