import { defineField } from 'sanity';

const associar = {
  name: 'associar',
  title: 'Booking',
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
      title: 'Hotel Room',
      type: 'reference',
      to: [{ type: 'associacoes' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'discount',
      title: 'Discount',
      type: 'number',
      initialValue: 0,
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'adults',
      title: 'Adults',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
  ],
};

export default associar;
