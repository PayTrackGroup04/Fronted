OE1
Objetivo Específico 1:
Analizar los procesos actuales de gestión de inventarios en PYMES industriales de Lima Metropolitana para identificar ineficiencias y cuantificar el impacto de sobrestocks, desabastecimientos y costos operativos utilizando metodologías basadas en datos.

Artefacto / Entregable 1:
Informe de diagnóstico logístico
Documento que detalla los procesos actuales de gestión de inventarios, identificando cuellos de botella, tiempos de reposición, registros manuales y zonas críticas de ineficiencia.

Artefacto / Entregable 2:
Base de datos estructurada con indicadores clave
Recopilación de datos históricos de inventarios (rotación, quiebres, stock mínimo y máximo, costos de almacenamiento) que servirá como insumo para el análisis y modelado posterior.

✅ OE2
Objetivo Específico 2:
Diseñar una arquitectura de sistema inteligente basada en machine learning, incorporando algoritmos de Random Forest y Gradient Boosting, para optimizar los niveles de inventario y predecir la demanda con alta precisión.

Artefacto / Entregable 1:
Documento técnico de arquitectura del sistema
Incluye diagramas de arquitectura, módulos, conexiones, uso de nube, entrada y salida de datos, así como integración con bases ya existentes en las PYMEs.

Artefacto / Entregable 2:
Prototipo funcional del modelo de predicción (Random Forest / Gradient Boosting)
Script o notebook con modelos entrenados, validación cruzada y métricas que muestren su precisión para predecir la demanda.

✅ OE3
Objetivo Específico 3:
Validar el sistema inteligente propuesto a través de un estudio de caso en una PYME seleccionada, midiendo las mejoras en la rotación de inventario, la reducción de costos y la precisión de la previsión de la demanda frente a las métricas de referencia.

Artefacto / Entregable 1:
Estudio de caso aplicado (Panificadora Torres SAC)
Documento detallado que describe la implementación del sistema en la empresa seleccionada, incluyendo contexto, cronograma, resultados y desafíos.

Artefacto / Entregable 2:
Dashboard comparativo de resultados
Herramienta visual (Power BI, Tableau u otro) que muestre la mejora en KPIs antes y después de aplicar el sistema: exactitud de predicción, reducción de quiebres y costos logísticos.

✅ OE4
Objetivo Específico 4:
Desarrollar un plan de sostenibilidad y escalabilidad para el sistema inteligente, que incluya protocolos de formación, estrategias de mantenimiento y directrices de integración para garantizar la adopción a largo plazo por parte de las pymes.

Artefacto / Entregable 1:
Manual de usuario y guía de capacitación
Documento que instruye sobre el uso del sistema inteligente, diseñado para operarios, gerentes y encargados de logística.

Artefacto / Entregable 2:
Plan de sostenibilidad y escalabilidad tecnológica
Estrategia documentada que define cómo mantener el sistema en el tiempo, incorporar nuevas funcionalidades y escalarlo a otras unidades o empresas similares.

import { Bono } from './bono.entity';

describe('Bono', () => {
  it('should create an instance', () => {
    expect({} as Bono).toBeTruthy();
  });
});
