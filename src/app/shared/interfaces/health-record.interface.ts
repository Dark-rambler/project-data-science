export interface HealthRecord {
    id: number;
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
    GenHlth: number;
    MentHlth: number;
    PhysHlth: number;
    DiffWalk: number;
    Sex: number;
    Age: number;
    Education: number;
    Income: number;
    created_at: string;
    user: number;
}

export interface HealthStats {
    totalRecords: number;
    averageBMI: number;
    riskFactorsCount: number;
    healthyHabitsCount: number;
    mentalHealthAverage: number;
    physicalHealthAverage: number;
}