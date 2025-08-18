Componente de Tags Dinámico con Next.js, Bootstrap y Material-UI
Código fuente desarrollado y compartido de forma gratuita por:

T O R R E N T E D E V S A S
Casa de desarrollo de software en Colombia

📜 Descripción
Este es un proyecto de código abierto que demuestra cómo crear un campo de entrada de "tags" (etiquetas o palabras clave) altamente interactivo y profesional en una aplicación Next.js con TypeScript. La principal característica es que ofrece dos implementaciones visuales que se pueden alternar en tiempo real: una con Bootstrap y otra con Material-UI (MUI).

El componente permite a los usuarios añadir palabras de forma dinámica, con validaciones y animaciones fluidas para una experiencia de usuario excepcional.

✨ Características Principales
Entrada Dinámica de Tags: Añade palabras separándolas por coma (,) o al presionar Enter.

Manejo de Texto Pegado: Pega una cadena de texto con palabras separadas por comas y el sistema las procesará automáticamente.

Límite de Tags: El campo se desactiva automáticamente al alcanzar el límite máximo de 10 tags.

Detección de Duplicados: Si se intenta añadir un tag que ya existe, la etiqueta existente se resalta y vibra para notificar al usuario.

Animaciones Profesionales:

Eliminación Suave: Los tags desaparecen con una animación de desvanecimiento y encogimiento.

Notificación de Duplicado: Una animación de vibración (shake) alerta sobre tags repetidos.

Doble Implementación (UI Swapping):

Un menú permite cambiar instantáneamente entre la versión estilizada con React-Bootstrap.

Y la versión implementada con Material-UI.

Diseño Responsivo y Moderno: La interfaz está diseñada para funcionar y verse bien en cualquier dispositivo.

🚀 Cómo Empezar
Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno de desarrollo local.

Prerrequisitos
Node.js (versión 18.x o superior)

npm o yarn

Instalación
Clona el repositorio (o descarga los archivos):

git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

Instala las dependencias del proyecto:

npm install

o si usas yarn:

yarn install

Ejecuta el servidor de desarrollo:

npm run dev

o si usas yarn:

yarn dev

Abre tu navegador y visita http://localhost:3000 para ver la aplicación en funcionamiento.

🛠️ Estructura del Código
El componente principal se encuentra en app/page.tsx y está estructurado de la siguiente manera:

'use client';: Declara el archivo como un "Client Component" de Next.js, lo que permite el uso de hooks de React y la interactividad del lado del cliente.

HomePage: Es el componente principal que gestiona el estado de la vista (bootstrap o material) y renderiza la interfaz general.

BootstrapTagInput: Un componente aislado que contiene toda la lógica y la estructura JSX para la versión de Bootstrap.

MaterialTagInput: Componente similar al anterior, pero implementado con los componentes y el sistema de estilos de Material-UI.

Lógica Compartida: Ambos componentes (BootstrapTagInput y MaterialTagInput) comparten una lógica interna muy similar para el procesamiento de los tags, lo que facilita su mantenimiento.

Estilos y Animaciones: Los estilos globales y las animaciones (@keyframes) se definen en una etiqueta <style> dentro del componente HomePage para mantener todo encapsulado.

📄 Licencia
Este proyecto se distribuye bajo la Licencia MIT.

Copyright (c) 2024 - Torrente Dev SAS

Por la presente se concede permiso, libre de cargos, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados (el "Software"), para comerciar con el Software sin restricción, incluyendo sin limitación los derechos de uso, copia, modificación, fusión, publicación, distribución, sublicencia, y/o venta de copias del Software, y para permitir a las personas a las que se les proporcione el Software que lo hagan, con sujeción a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las copias o porciones sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE COMERCIABILIDAD, IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN. EN NINGÚN CASO LOS AUTORES O TITULARES DEL COPYRIGHT SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑO U OTRA RESPONSABILIDAD, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O CUALQUIER OTRO MOTIVO, DERIVADA DE, FUERA DE O EN CONEXIÓN CON EL SOFTWARE O SU USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
