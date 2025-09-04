import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'shopSettings',
  title: 'Shop Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'shopName',
      title: 'Shop Name',
      type: 'string',
      validation: Rule => Rule.required().max(50)
    }),
    defineField({
      name: 'shopDescription',
      title: 'Shop Description',
      type: 'text',
      description: 'Brief description of your shop',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'shopLogo',
      title: 'Shop Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ]
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      description: 'Header banner for the shop'
    }),
    defineField({
      name: 'owner',
      title: 'Shop Owner',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Owner Name',
          type: 'string',
          validation: Rule => Rule.required()
        },
        {
          name: 'bio',
          title: 'Owner Bio',
          type: 'text',
          description: 'Brief introduction about the shop owner'
        },
        {
          name: 'avatar',
          title: 'Owner Avatar',
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        },
        {
          name: 'verified',
          title: 'Verified Owner',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'socialLinks',
          title: 'Social Links',
          type: 'object',
          fields: [
            {
              name: 'wechat',
              title: 'WeChat',
              type: 'string'
            },
            {
              name: 'email',
              title: 'Email',
              type: 'email'
            },
            {
              name: 'website',
              title: 'Website',
              type: 'url'
            },
            {
              name: 'twitter',
              title: 'Twitter',
              type: 'url'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'digitalProduct' }]
        }
      ],
      description: 'Products to highlight on the shop homepage'
    }),
    defineField({
      name: 'testimonials',
      title: 'Customer Testimonials',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Customer Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'avatar',
              title: 'Customer Avatar',
              type: 'image',
              options: { hotspot: true }
            },
            {
              name: 'rating',
              title: 'Rating',
              type: 'number',
              validation: Rule => Rule.required().min(1).max(5)
            },
            {
              name: 'review',
              title: 'Review Text',
              type: 'text',
              validation: Rule => Rule.required().max(300)
            },
            {
              name: 'productRef',
              title: 'Related Product',
              type: 'reference',
              to: [{ type: 'digitalProduct' }]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'announcement',
      title: 'Shop Announcement',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Announcement',
          type: 'boolean',
          initialValue: false
        },
        {
          name: 'type',
          title: 'Announcement Type',
          type: 'string',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Success', value: 'success' },
              { title: 'Warning', value: 'warning' },
              { title: 'Sale', value: 'sale' }
            ]
          },
          initialValue: 'info'
        },
        {
          name: 'message',
          title: 'Announcement Message',
          type: 'string',
          validation: Rule => Rule.max(100)
        },
        {
          name: 'link',
          title: 'Link URL',
          type: 'url',
          description: 'Optional link for the announcement'
        }
      ]
    }),
    defineField({
      name: 'socialSharing',
      title: 'Social Sharing',
      type: 'object',
      fields: [
        {
          name: 'defaultHashtags',
          title: 'Default Hashtags',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Default hashtags for social media sharing'
        },
        {
          name: 'shareMessage',
          title: 'Default Share Message',
          type: 'text',
          description: 'Default message for social sharing'
        }
      ]
    }),
    defineField({
      name: 'customization',
      title: 'Theme Customization',
      type: 'object',
      fields: [
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          description: 'Main brand color (hex)',
          validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
        },
        {
          name: 'secondaryColor',
          title: 'Secondary Color',
          type: 'string',
          description: 'Secondary brand color (hex)',
          validation: Rule => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color')
        },
        {
          name: 'fontFamily',
          title: 'Font Family',
          type: 'string',
          options: {
            list: [
              { title: 'Inter (Default)', value: 'inter' },
              { title: 'Poppins', value: 'poppins' },
              { title: 'Roboto', value: 'roboto' },
              { title: 'Noto Sans SC (中文)', value: 'noto-sans-sc' }
            ]
          }
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'shopName',
      subtitle: 'shopDescription',
      media: 'shopLogo'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title: `🛍️ ${title || 'Shop Settings'}`,
        subtitle
      }
    }
  }
})