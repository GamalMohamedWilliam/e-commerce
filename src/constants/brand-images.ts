

import type { StaticImageData } from "next/image";

// ---------- imports بالمسميات الموجودة عندك ----------
import imgi_1_1678286824747  from "@/assets/brands/imgi_1_1678286824747.png";   // Canon
import imgi_2_1678286767914  from "@/assets/brands/imgi_2_1678286767914.png";   // DELL
import imgi_3_1678286730980  from "@/assets/brands/imgi_3_1678286730980.png";   // Lenovo
import imgi_4_1678286680638  from "@/assets/brands/imgi_4_1678286680638.png";   // SONY
import imgi_5_1678286620402  from "@/assets/brands/imgi_5_1678286620402.png";   // Infinix
import imgi_6_1678286577463  from "@/assets/brands/imgi_6_1678286577463.png";   // realme
import imgi_7_1678286539788  from "@/assets/brands/imgi_7_1678286539788.png";   // HONOR
import imgi_8_1678286502288  from "@/assets/brands/imgi_8_1678286502288.png";   // NOKIA
import imgi_9_1678286465856  from "@/assets/brands/imgi_9_1678286465856.png";   // OPPO
import imgi_10_1678286421517 from "@/assets/brands/imgi_10_1678286421517.png";  // HUAWEI
import imgi_11_1678286391415 from "@/assets/brands/imgi_11_1678286391415.png";  // Apple
import imgi_12_1678286366797 from "@/assets/brands/imgi_12_1678286366797.png";  // Mi (Xiaomi)

import imgi_13_1678286321029 from "@/assets/brands/imgi_13_1678286321029.png";  // SAMSUNG
import imgi_14_1678286281363 from "@/assets/brands/imgi_14_1678286281363.png";  // JACK&JONES
import imgi_15_1678286238428 from "@/assets/brands/imgi_15_1678286238428.png";  // LC WAIKIKI
import imgi_16_1678286204060 from "@/assets/brands/imgi_16_1678286204060.png";  // Andora
import imgi_17_1678286172219 from "@/assets/brands/imgi_17_1678286172219.png";  // PUMA
import imgi_18_1678286142113 from "@/assets/brands/imgi_18_1678286142113.png";  // SKECHERS
import imgi_19_1678286099850 from "@/assets/brands/imgi_19_1678286099850.png";  // RESERVED
import imgi_20_1678286058845 from "@/assets/brands/imgi_20_1678286058845.png";  // Reebok
import imgi_21_1678285881943 from "@/assets/brands/imgi_21_1678285881943.png";  // adidas
import imgi_22_1678285837630 from "@/assets/brands/imgi_22_1678285837630.png";  // Nike
import imgi_23_1678285758109 from "@/assets/brands/imgi_23_1678285758109.png";  // DeFacto
import imgi_24_1678285724527 from "@/assets/brands/imgi_24_1678285724527.png";  // beko

import imgi_25_1678285698559 from "@/assets/brands/imgi_25_1678285698559.png";  // KENWOOD
import imgi_26_1678285650508 from "@/assets/brands/imgi_26_1678285650508.png";  // BLACK+DECKER
import imgi_27_1678285592826 from "@/assets/brands/imgi_27_1678285592826.png";  // Mienta
import imgi_28_1678285558892 from "@/assets/brands/imgi_28_1678285558892.png";  // Fresh
import imgi_29_1678285517454 from "@/assets/brands/imgi_29_1678285517454.png";  // Philips
import imgi_30_1678285481289 from "@/assets/brands/imgi_30_1678285481289.png";  // Toshiba
import imgi_31_1678285447068 from "@/assets/brands/imgi_31_1678285447068.png";  // Tornado
import imgi_32_1678285367650 from "@/assets/brands/imgi_32_1678285367650.png";  // Braun
import imgi_33_1678285324193 from "@/assets/brands/imgi_33_1678285324193.png";  // Garnier
import imgi_34_1678285277076 from "@/assets/brands/imgi_34_1678285277076.png";  // essence
import imgi_35_1678285240940 from "@/assets/brands/imgi_35_1678285240940.png";  // BOURJOIS
import imgi_36_1678285201152 from "@/assets/brands/imgi_36_1678285201152.png";  // Kemei

import imgi_37_1678285115409 from "@/assets/brands/imgi_37_1678285115409.png";  // Carolina Herrera
import imgi_38_1678285065497 from "@/assets/brands/imgi_38_1678285065497.png";  // Calvin Klein
import imgi_39_1678285025559 from "@/assets/brands/imgi_39_1678285025559.png";  // L'Oréal
import imgi_40_1678284642946 from "@/assets/brands/imgi_40_1678284642946.png";  // Maybelline

// ---------- الماب بالاسم المعروض → الصورة ----------
export const BRAND_IMAGES: Record<string, StaticImageData> = {
  Canon: imgi_1_1678286824747,
  DELL: imgi_2_1678286767914,
  Lenovo: imgi_3_1678286730980,
  SONY: imgi_4_1678286680638,
  Infinix: imgi_5_1678286620402,
  realme: imgi_6_1678286577463,
  HONOR: imgi_7_1678286539788,
  NOKIA: imgi_8_1678286502288,
  OPPO: imgi_9_1678286465856,
  HUAWEI: imgi_10_1678286421517,
  Apple: imgi_11_1678286391415,
  Mi: imgi_12_1678286366797,           // Xiaomi

  SAMSUNG: imgi_13_1678286321029,
  "JACK&JONES": imgi_14_1678286281363,
  "LC Waikiki": imgi_15_1678286238428,
  Andora: imgi_16_1678286204060,
  PUMA: imgi_17_1678286172219,
  SKECHERS: imgi_18_1678286142113,
  RESERVED: imgi_19_1678286099850,
  Reebok: imgi_20_1678286058845,
  adidas: imgi_21_1678285881943,
  Nike: imgi_22_1678285837630,
  DeFacto: imgi_23_1678285758109,
  beko: imgi_24_1678285724527,

  KENWOOD: imgi_25_1678285698559,
  "BLACK+DECKER": imgi_26_1678285650508,
  Mienta: imgi_27_1678285592826,
  Fresh: imgi_28_1678285558892,
  Philips: imgi_29_1678285517454,
  Toshiba: imgi_30_1678285481289,
  Tornado: imgi_31_1678285447068,
  Braun: imgi_32_1678285367650,
  Garnier: imgi_33_1678285324193,
  essence: imgi_34_1678285277076,
  BOURJOIS: imgi_35_1678285240940,
  Kemei: imgi_36_1678285201152,

  "Carolina Herrera": imgi_37_1678285115409,
  "Calvin Klein": imgi_38_1678285065497,
  "L'Oréal": imgi_39_1678285025559,
  Maybelline: imgi_40_1678284642946,
};

export const BRAND_LIST = Object.keys(BRAND_IMAGES);
export const DEFAULT_BRAND_IMAGE = imgi_11_1678286391415; // Apple كافتراضي
