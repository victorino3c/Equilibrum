export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      alimento: {
        Row: {
          calorias: number;
          carbohidratos: number | null;
          created_at: string;
          descripcion: string | null;
          grasa: number | null;
          id: string;
          nombre: string;
          proteina: number | null;
          tipo_medida: Database['public']['Enums']['tipo_medida_enum'] | null;
        };
        Insert: {
          calorias: number;
          carbohidratos?: number | null;
          created_at?: string;
          descripcion?: string | null;
          grasa?: number | null;
          id?: string;
          nombre: string;
          proteina?: number | null;
          tipo_medida?: Database['public']['Enums']['tipo_medida_enum'] | null;
        };
        Update: {
          calorias?: number;
          carbohidratos?: number | null;
          created_at?: string;
          descripcion?: string | null;
          grasa?: number | null;
          id?: string;
          nombre?: string;
          proteina?: number | null;
          tipo_medida?: Database['public']['Enums']['tipo_medida_enum'] | null;
        };
        Relationships: [];
      };
      ejercicios: {
        Row: {
          calorias: number | null;
          created_at: string;
          descripcion: string | null;
          id: string;
          imagen: string | null;
          musculos: Database['public']['Enums']['musculos_enum'][] | null;
          nombre: string;
          tipo_ejercicio: Database['public']['Enums']['tipo_ejercicio_enum'];
        };
        Insert: {
          calorias?: number | null;
          created_at?: string;
          descripcion?: string | null;
          id?: string;
          imagen?: string | null;
          musculos?: Database['public']['Enums']['musculos_enum'][] | null;
          nombre: string;
          tipo_ejercicio: Database['public']['Enums']['tipo_ejercicio_enum'];
        };
        Update: {
          calorias?: number | null;
          created_at?: string;
          descripcion?: string | null;
          id?: string;
          imagen?: string | null;
          musculos?: Database['public']['Enums']['musculos_enum'][] | null;
          nombre?: string;
          tipo_ejercicio?: Database['public']['Enums']['tipo_ejercicio_enum'];
        };
        Relationships: [];
      };
      ejercicios_entrenamiento: {
        Row: {
          created_at: string;
          id_ejercicio: string;
          id_entrenamiento: string;
        };
        Insert: {
          created_at?: string;
          id_ejercicio?: string;
          id_entrenamiento?: string;
        };
        Update: {
          created_at?: string;
          id_ejercicio?: string;
          id_entrenamiento?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'ejercicios_entrenamiento_id_ejercicio_fkey';
            columns: ['id_ejercicio'];
            isOneToOne: false;
            referencedRelation: 'ejercicios';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'ejercicios_entrenamiento_id_entrenamiento_fkey';
            columns: ['id_entrenamiento'];
            isOneToOne: false;
            referencedRelation: 'entrenamiento';
            referencedColumns: ['id'];
          },
        ];
      };
      entrenamiento: {
        Row: {
          calorias: number | null;
          created_at: string;
          duracion: number | null;
          fecha: string;
          id: string;
          imagen: string | null;
          notas: string | null;
          numero: number | null;
          sensacion: Database['public']['Enums']['sensaciones_enum'] | null;
          series: number | null;
          titulo: string | null;
          user_id: string;
          volumen: number | null;
        };
        Insert: {
          calorias?: number | null;
          created_at?: string;
          duracion?: number | null;
          fecha: string;
          id?: string;
          imagen?: string | null;
          notas?: string | null;
          numero?: number | null;
          sensacion?: Database['public']['Enums']['sensaciones_enum'] | null;
          series?: number | null;
          titulo?: string | null;
          user_id?: string;
          volumen?: number | null;
        };
        Update: {
          calorias?: number | null;
          created_at?: string;
          duracion?: number | null;
          fecha?: string;
          id?: string;
          imagen?: string | null;
          notas?: string | null;
          numero?: number | null;
          sensacion?: Database['public']['Enums']['sensaciones_enum'] | null;
          series?: number | null;
          titulo?: string | null;
          user_id?: string;
          volumen?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'entrenamiento_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      nutricion: {
        Row: {
          calorias: number | null;
          carbohidratos: number | null;
          created_at: string;
          fecha: string;
          grasa: number | null;
          proteina: number | null;
          tipo_nutricion: Database['public']['Enums']['tipo_nutricion_enum'];
          user_id: string;
        };
        Insert: {
          calorias?: number | null;
          carbohidratos?: number | null;
          created_at?: string;
          fecha: string;
          grasa?: number | null;
          proteina?: number | null;
          tipo_nutricion: Database['public']['Enums']['tipo_nutricion_enum'];
          user_id?: string;
        };
        Update: {
          calorias?: number | null;
          carbohidratos?: number | null;
          created_at?: string;
          fecha?: string;
          grasa?: number | null;
          proteina?: number | null;
          tipo_nutricion?: Database['public']['Enums']['tipo_nutricion_enum'];
          user_id?: string;
        };
        Relationships: [];
      };
      nutricion_alimento: {
        Row: {
          cantidad: number;
          created_at: string;
          fecha_nutricion: string;
          id_alimento: string;
          tipo_nutricion: Database['public']['Enums']['tipo_nutricion_enum'];
          user_id: string;
        };
        Insert: {
          cantidad?: number;
          created_at?: string;
          fecha_nutricion: string;
          id_alimento: string;
          tipo_nutricion: Database['public']['Enums']['tipo_nutricion_enum'];
          user_id: string;
        };
        Update: {
          cantidad?: number;
          created_at?: string;
          fecha_nutricion?: string;
          id_alimento?: string;
          tipo_nutricion?: Database['public']['Enums']['tipo_nutricion_enum'];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'nutricion_alimento_fecha_nutricion_tipo_nutricion_user_id_fkey';
            columns: ['fecha_nutricion', 'tipo_nutricion', 'user_id'];
            isOneToOne: false;
            referencedRelation: 'nutricion';
            referencedColumns: ['fecha', 'tipo_nutricion', 'user_id'];
          },
          {
            foreignKeyName: 'nutricion_alimento_id_alimento_fkey';
            columns: ['id_alimento'];
            isOneToOne: false;
            referencedRelation: 'alimento';
            referencedColumns: ['id'];
          },
        ];
      };
      objetivos: {
        Row: {
          agua: number | null;
          calorias: number | null;
          created_at: string;
          id: string;
          sueño: number | null;
          user_id: string;
        };
        Insert: {
          agua?: number | null;
          calorias?: number | null;
          created_at?: string;
          id?: string;
          sueño?: number | null;
          user_id?: string;
        };
        Update: {
          agua?: number | null;
          calorias?: number | null;
          created_at?: string;
          id?: string;
          sueño?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'objetivos_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      objetivos_diarios: {
        Row: {
          agua: number | null;
          calorias: number | null;
          created_at: string;
          fecha: string;
          sueño: number | null;
          user_id: string;
        };
        Insert: {
          agua?: number | null;
          calorias?: number | null;
          created_at?: string;
          fecha?: string;
          sueño?: number | null;
          user_id?: string;
        };
        Update: {
          agua?: number | null;
          calorias?: number | null;
          created_at?: string;
          fecha?: string;
          sueño?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'objetivos_diarios_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
          website: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      series_calistenia: {
        Row: {
          calorias: number | null;
          check: boolean;
          created_at: string;
          id: string;
          id_ejercicio: string;
          id_entrenamiento: string | null;
          repeticiones: number | null;
        };
        Insert: {
          calorias?: number | null;
          check?: boolean;
          created_at?: string;
          id?: string;
          id_ejercicio?: string;
          id_entrenamiento?: string | null;
          repeticiones?: number | null;
        };
        Update: {
          calorias?: number | null;
          check?: boolean;
          created_at?: string;
          id?: string;
          id_ejercicio?: string;
          id_entrenamiento?: string | null;
          repeticiones?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'series_calistenia_id_ejercicio_fkey';
            columns: ['id_ejercicio'];
            isOneToOne: false;
            referencedRelation: 'ejercicios';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'series_calistenia_id_entrenamiento_fkey';
            columns: ['id_entrenamiento'];
            isOneToOne: false;
            referencedRelation: 'entrenamiento';
            referencedColumns: ['id'];
          },
        ];
      };
      series_cardio: {
        Row: {
          calorias: number | null;
          check: boolean;
          created_at: string;
          distancia: number | null;
          duracion: number | null;
          id: string;
          id_ejercicio: string;
          id_entrenamiento: string | null;
        };
        Insert: {
          calorias?: number | null;
          check?: boolean;
          created_at?: string;
          distancia?: number | null;
          duracion?: number | null;
          id?: string;
          id_ejercicio: string;
          id_entrenamiento?: string | null;
        };
        Update: {
          calorias?: number | null;
          check?: boolean;
          created_at?: string;
          distancia?: number | null;
          duracion?: number | null;
          id?: string;
          id_ejercicio?: string;
          id_entrenamiento?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'series_cardio_id_ejercicio_fkey';
            columns: ['id_ejercicio'];
            isOneToOne: false;
            referencedRelation: 'ejercicios';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'series_cardio_id_entrenamiento_fkey';
            columns: ['id_entrenamiento'];
            isOneToOne: false;
            referencedRelation: 'entrenamiento';
            referencedColumns: ['id'];
          },
        ];
      };
      series_fuerza: {
        Row: {
          calorias: number | null;
          check: boolean;
          created_at: string;
          id: string;
          id_ejercicio: string;
          id_entrenamiento: string | null;
          peso: number | null;
          repeticiones: number | null;
        };
        Insert: {
          calorias?: number | null;
          check?: boolean;
          created_at?: string;
          id?: string;
          id_ejercicio: string;
          id_entrenamiento?: string | null;
          peso?: number | null;
          repeticiones?: number | null;
        };
        Update: {
          calorias?: number | null;
          check?: boolean;
          created_at?: string;
          id?: string;
          id_ejercicio?: string;
          id_entrenamiento?: string | null;
          peso?: number | null;
          repeticiones?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'series_fuerza_id_ejercicio_fkey';
            columns: ['id_ejercicio'];
            isOneToOne: false;
            referencedRelation: 'ejercicios';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'series_fuerza_id_entrenamiento_fkey';
            columns: ['id_entrenamiento'];
            isOneToOne: false;
            referencedRelation: 'entrenamiento';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      musculos_enum:
        | 'Pectoral mayor'
        | 'Pectoral menor'
        | 'Dorsal ancho'
        | 'Trapecio'
        | 'Romboides'
        | 'Deltoides anterior'
        | 'Deltoides medial'
        | 'Deltoides posterior'
        | 'Biceps braquial'
        | 'Braquiorradial'
        | 'Triceps braquial'
        | 'Antebrazo'
        | 'Cuádriceps'
        | 'Isquiotibial'
        | 'Glúteo mayor'
        | 'Glúteo medio'
        | 'Glúteo menor'
        | 'Abductor'
        | 'Gemelo'
        | 'Recto abdominal'
        | 'Oblicuos externos'
        | 'Oblicuos internos'
        | 'Transverso abdominal';
      sensaciones_enum: 'Muy negativo' | 'Negativo' | 'Neutro' | 'Positivo' | 'Muy positivo';
      tipo_ejercicio_enum: 'cardio' | 'calistenia' | 'fuerza';
      tipo_medida_enum:
        | 'Plato'
        | 'Ración'
        | 'Peso'
        | 'Grande'
        | 'Pequeño'
        | 'Mediano'
        | 'Volumen'
        | 'Taza';
      tipo_nutricion_enum: 'Desayuno' | 'Comida' | 'Cena' | 'Snacks';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums'] | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      musculos_enum: [
        'Pectoral mayor',
        'Pectoral menor',
        'Dorsal ancho',
        'Trapecio',
        'Romboides',
        'Deltoides anterior',
        'Deltoides medial',
        'Deltoides posterior',
        'Biceps braquial',
        'Braquiorradial',
        'Triceps braquial',
        'Antebrazo',
        'Cuádriceps',
        'Isquiotibial',
        'Glúteo mayor',
        'Glúteo medio',
        'Glúteo menor',
        'Abductor',
        'Gemelo',
        'Recto abdominal',
        'Oblicuos externos',
        'Oblicuos internos',
        'Transverso abdominal',
      ],
      sensaciones_enum: ['Muy negativo', 'Negativo', 'Neutro', 'Positivo', 'Muy positivo'],
      tipo_ejercicio_enum: ['cardio', 'calistenia', 'fuerza'],
      tipo_medida_enum: [
        'Plato',
        'Ración',
        'Peso',
        'Grande',
        'Pequeño',
        'Mediano',
        'Volumen',
        'Taza',
      ],
      tipo_nutricion_enum: ['Desayuno', 'Comida', 'Cena', 'Snacks'],
    },
  },
} as const;
