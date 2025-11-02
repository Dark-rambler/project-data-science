export interface HealthInputData {
    HighBP: number;
    HighChol: number;
    CholCheck: number;
    BMI: number;
    Smoker: number;
    Stroke: number;
    HeartDiseaseorAttack: number;
    PhysActivity: number;
    Fruits: number;
    Veggies: number;
    HvyAlcoholConsump: number;
    AnyHealthcare: number;
    NoDocbcCost: number;
    GenHlth: number | string;
    MentHlth: number;
    PhysHlth: number;
    DiffWalk: number;
    Sex: number | string;
    Age: number;
    Education: number;
    Income: number;
}

export interface HealthRecord {
    id: number;
    input_data: HealthInputData;
    prediction: number;
    prob_no_diabetes: number;
    prob_diabetes: number;
    created_at: string;
}

export interface HealthStats {
    totalRecords: number;
    averageBMI: number;
    riskFactorsCount: number;
    healthyHabitsCount: number;
    mentalHealthAverage: number;
    physicalHealthAverage: number;
    diabetesRiskAverage: number;
    highRiskCount: number;
}