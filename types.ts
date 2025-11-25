
export interface MakeupOptions {
  mode: 'preset' | 'manual' | 'custom';
  selectedPresetId: string | null;
  manualSettings: { [key: string]: MakeupApplication };
  customPrompt: string;
}

export interface MakeupApplication {
  areaId: string;
  areaName: string;
  color: string;
  intensity: number; // 0-100
  style?: string; // e.g., "Matte", "Glossy", "Smokey"
}

export interface FaceAnalysisResult {
  faceShape: string;
  skinTone: string;
  suggestion: string;
  reasoning: string;
  recommendedColors: string[];
}

export interface PresetLook {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string; // emoji or url
}
