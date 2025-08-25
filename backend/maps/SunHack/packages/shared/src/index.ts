export type ProjectStatus = "planned" | "ongoing" | "completed" | "delayed";

export interface GeoLocation {
    lat: number;
    lng: number;
}

export interface CityProject {
    id: string;
    name: string;
    description?: string;
    category: "road" | "real_estate" | "public_infra";
    status: ProjectStatus;
    location: GeoLocation;
    startedAt?: string; // ISO date
    expectedCompletion?: string; // ISO date
    lastUpdatedAt: string; // ISO date
}

export type AlertSeverity = "info" | "warning" | "critical";
export type AlertType = "power_outage" | "traffic" | "sewage" | "hazard" | "weather" | "closure";

export interface Alert {
    id: string;
    type: AlertType;
    severity: AlertSeverity;
    message: string;
    location: GeoLocation;
    createdAt: string; // ISO date
    source: "authority" | "citizen" | "system";
}

export interface CitizenReport {
    id: string;
    reporterId?: string;
    contact?: string;
    description: string;
    photoUrl?: string;
    location: GeoLocation;
    createdAt: string; // ISO date
    kind: "pothole" | "waterlogging" | "accident" | "closure" | "power" | "sewage" | "other";
    status: "new" | "acknowledged" | "in_progress" | "resolved";
}

export interface CongestionSnapshot {
    id: string;
    location: GeoLocation;
    level: 0 | 1 | 2 | 3 | 4 | 5; // 0 free flow, 5 jammed
    updatedAt: string; // ISO date
    causeHint?: string;
}

export interface PublicFeatureCollection {
    projects: CityProject[];
    alerts: Alert[];
    reports: CitizenReport[];
    congestion: CongestionSnapshot[];
}


