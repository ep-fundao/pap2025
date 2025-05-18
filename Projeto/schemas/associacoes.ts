import { defineField } from 'sanity';

const associacaoTypes = [
  { title: 'cultural', value: 'cultural' },
  { title: 'desportiva', value: 'desportiva' },
  { title: 'outras', value: 'outras' },
];

const associacoes = {
  name: 'associacoes',
  title: 'Associações',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
      validation: Rule =>
        Rule.required().max(50).error('Maximum 50 Characters'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      validation: Rule =>
        Rule.required().max(500).error('Máximo de 500 caracteres'),
    }),
    defineField({
      name: 'price',
      title: 'Preço',
      type: 'number',
      validation: Rule =>
        Rule.required().max(100).error('Máximo de 100 caracteres'),
    }),
    defineField({
      name: 'discount',
      title: 'Disconto',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.min(0),
    }),
    defineField({
      name: 'images',
      title: 'Imagens',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'url', type: 'url', title: 'URL' },
            { name: 'file', type: 'file', title: 'File' },
          ],
        },
      ],
      validation: Rule =>
        Rule.required().min(1).error('Mínimo de 1 imagem'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'object',
      fields: [
        { name: 'url', type: 'url', title: 'URL' },
        { name: 'file', type: 'file', title: 'File' },
      ],
      validation: Rule => Rule.required().error('Imagem de Capa é obrigatoria'),
    }),
    defineField({
      name: 'type',
      title: 'Tipo de Associação',
      type: 'string',
      options: {
        list: associacaoTypes,
      },
      validation: Rule => Rule.required(),
      initialValue: 'outras',
    }),
    defineField({
      name: 'specialNote',
      title: 'Notas Adicionais',
      type: 'text',
      validation: Rule => Rule.required(),
      initialValue:
        '...',
    }),
    defineField({
      name: 'dimension',
      title: 'Dimensão',
      type: 'string',
    }),
    defineField({
      name: 'offeredAmenities',
      title: 'Eventos / Extras',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon', type: 'string' },
            { name: 'amenity', title: 'Amenity', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'isSocio',
      title: 'Is Socio',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [{ type: 'review' }],
    }),
  ],
};

export default associacoes;
