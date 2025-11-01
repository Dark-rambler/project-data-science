import { Validators } from '@angular/forms';

export const HEALTH_FORM_CONTROLS = {
    HighBP: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    HighChol: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    CholCheck: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    BMI: [25, [Validators.required, Validators.min(12), Validators.max(98)]],
    Smoker: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    Stroke: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    HeartDiseaseorAttack: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    PhysActivity: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    Fruits: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    Veggies: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    HvyAlcoholConsump: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    AnyHealthcare: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
    NoDocbcCost: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    GenHlth: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
    MentHlth: [0, [Validators.required, Validators.min(0), Validators.max(30)]],
    PhysHlth: [0, [Validators.required, Validators.min(0), Validators.max(30)]],
    DiffWalk: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    Sex: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
    Age: [7, [Validators.required, Validators.min(1), Validators.max(13)]],
    Education: [4, [Validators.required, Validators.min(1), Validators.max(6)]],
    Income: [5, [Validators.required, Validators.min(1), Validators.max(8)]]
};

export const HEALTH_FORM_LABELS = {
    HighBP: "Presión arterial alta",
    HighChol: "Colesterol alto",
    CholCheck: "Chequeo de colesterol",
    BMI: "Índice de masa corporal (BMI)",
    Smoker: "Fumador",
    Stroke: "Derrame cerebral",
    HeartDiseaseorAttack: "Enfermedad cardiaca o infarto",
    PhysActivity: "Actividad física",
    Fruits: "Consume frutas",
    Veggies: "Consume vegetales",
    HvyAlcoholConsump: "Consumo excesivo de alcohol",
    AnyHealthcare: "Tiene atención médica",
    NoDocbcCost: "No puede pagar el doctor",
    GenHlth: "Salud general",
    MentHlth: "Días de mala salud mental (últimos 30 días)",
    PhysHlth: "Días de mala salud física (últimos 30 días)",
    DiffWalk: "Dificultad para caminar",
    Sex: "Sexo",
    Age: "Grupo de edad",
    Education: "Nivel educativo",
    Income: "Nivel de ingresos"
};

export const SELECT_OPTIONS = {
    binaryOptions: [
        { value: 0, label: "No" },
        { value: 1, label: "Sí" }
    ],
    generalHealthOptions: [
        { value: 1, label: "Excelente" },
        { value: 2, label: "Muy buena" },
        { value: 3, label: "Buena" },
        { value: 4, label: "Regular" },
        { value: 5, label: "Mala" }
    ],
    sexOptions: [
        { value: 0, label: "Femenino" },
        { value: 1, label: "Masculino" }
    ],
    ageOptions: [
        { value: 1, label: "18-24 años" },
        { value: 2, label: "25-29 años" },
        { value: 3, label: "30-34 años" },
        { value: 4, label: "35-39 años" },
        { value: 5, label: "40-44 años" },
        { value: 6, label: "45-49 años" },
        { value: 7, label: "50-54 años" },
        { value: 8, label: "55-59 años" },
        { value: 9, label: "60-64 años" },
        { value: 10, label: "65-69 años" },
        { value: 11, label: "70-74 años" },
        { value: 12, label: "75-79 años" },
        { value: 13, label: "80+ años" }
    ],
    educationOptions: [
        { value: 1, label: "Sin educación formal o jardín" },
        { value: 2, label: "Primaria (1-8 grados)" },
        { value: 3, label: "Secundaria incompleta (9-11 grados)" },
        { value: 4, label: "Secundaria completa o equivalente" },
        { value: 5, label: "Educación superior incompleta" },
        { value: 6, label: "Título universitario o superior" }
    ],
    incomeOptions: [
        { value: 1, label: "Menos de $10,000" },
        { value: 2, label: "$10,000 - $14,999" },
        { value: 3, label: "$15,000 - $19,999" },
        { value: 4, label: "$20,000 - $24,999" },
        { value: 5, label: "$25,000 - $34,999" },
        { value: 6, label: "$35,000 - $49,999" },
        { value: 7, label: "$50,000 - $74,999" },
        { value: 8, label: "$75,000 o más" }
    ]
};

// Campos que usan switch (valores binarios 0/1)
export const BINARY_FIELDS = [
    'HighBP', 'HighChol', 'CholCheck', 'Smoker', 'Stroke', 
    'HeartDiseaseorAttack', 'PhysActivity', 'Fruits', 'Veggies', 
    'HvyAlcoholConsump', 'AnyHealthcare', 'NoDocbcCost', 'DiffWalk'
];