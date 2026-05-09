# Entrega General - Práctica Healthy America

## Diagrama de navegación del repositorio

```mermaid
graph TD
    A[Repositorio GitHub] --> B[Reto 2: Shopify Dawn]
    A --> C[Reto 3: Lógica / Funcionalidad]
    A --> D[/docs]

    B --> B1[theme/ dawn]
    B1 --> B2[snippets/ facets.liquid]
    B1 --> B3[sections/ header.liquid]
    B1 --> B4[sections/ footer.liquid]
    B1 --> B5[sections/ main-cart-footer.liquid]
    B1 --> B6[sections/ main-cart-items.liquid]
    B1 --> B7[sections/ complete-stack.liquid]
    B1 --> B8[assets/ component-facets.css]
    B1 --> B9[templates/ product.json]
    B1 --> B10[templates/ index.json]

    C --> C1[cart-drawer.liquid]
    C1 --> C2[Envíos: Cali $15k / Nal $19k]
    C1 --> C3[Barra progreso envío gratis]
    C1 --> C4[Detección ciudad cliente]

    D --> D1[Reto 1: Documento PDF]
    D --> D2[Reto 4: Documento PDF]
    D --> D3[README.md]

    style A fill:#2563eb,color:#fff
    style B fill:#059669,color:#fff
    style C fill:#d97706,color:#fff
    style D fill:#7c3aed,color:#fff
```

## Cómo ejecutar localmente

1. Clonar el repositorio.
2. Tener instalado Shopify CLI.
3. Ejecutar:

```bash
shopify theme dev --store tu-tienda.myshopify.com
```

## Estructura de la entrega

| Carpeta / Archivo | Descripción |
|-------------------|-------------|
| `dawn/` | Tema Shopify Dawn personalizado |
| `dawn/snippets/facets.liquid` | Filtros laterales (Availability, Price estáticos) |
| `dawn/snippets/cart-drawer.liquid` | Drawer del carrito con lógica de envíos |
| `dawn/sections/complete-stack.liquid` | Cross-sell entre líneas de producto |
| `dawn/sections/header.liquid` | Header con menú mobile, nombre de cliente |
| `dawn/sections/main-cart-footer.liquid` | Footer del carrito principal, envíos + barra |
| `dawn/sections/main-cart-items.liquid` | Items del carrito con textos en español |
| `dawn/assets/component-facets.css` | CSS para filtros responsive |
| `docs/` | Documentos Reto 1 y Reto 4 |
