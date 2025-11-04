import 'reflect-metadata';

export default defineNitroPlugin(() => {
  // This plugin ensures reflect-metadata is loaded before any TypeORM decorators are processed
  console.log('✅ reflect-metadata loaded');
});
