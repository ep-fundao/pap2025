import { defineField } from 'sanity';

const associar = {
  name: 'associar',
  title: 'Associar',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'associacoes',
      title: 'Associações',
      type: 'reference',
      to: [{ type: 'associacoes' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'discount',
      title: 'Desconto',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'adults',
      title: 'Nº de Sócios',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'totalPrice',
      title: 'Preço Total',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
  ],
};

export default associar;
