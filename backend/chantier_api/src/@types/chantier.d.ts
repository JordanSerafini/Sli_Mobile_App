export interface Chantier {
    id: number;
    name: string;
    description: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
    phone: string;
    email: string;
    contact: string;
    start_date: Date;
    end_date: Date;
    client_id: number;
    calendar_id: number;
    fiche_chantier_id: number;
    ficheChantiers: {
      id: number;
      name: string;
      description: string;
      project_supervision: string;
      project_manager_id: number;
      chantier_id: number;
    }[];
    staff: {
      id: number;
      FicheChantier_id: number;
      staff_id: number;
      grade: string;
    }[];
    items: {
      id: number;
      quantity: number;
      item_id: number;
      fiche_chantier_id: number;
    }[];
  }