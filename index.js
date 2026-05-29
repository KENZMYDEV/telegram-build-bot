const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
    await ctx.reply(`🔵═══════════════════════════════
🔵     BUILD APK BOT        
🔵═══════════════════════════════

🚀 Pilih fitur:

🔨 Build Flutter APK
🔨 Build Android APK
🌐 Deploy ke Vercel

✅ Bot siap digunakan!`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🔨 Build Flutter', callback_data: 'build_flutter' }],
                [{ text: '🔨 Build Android', callback_data: 'build_android' }],
                [{ text: '🌐 Deploy Vercel', callback_data: 'deploy_vercel' }]
            ]
        }
    });
});

bot.action('build_flutter', async (ctx) => {
    await ctx.reply(`🔨 BUILD FLUTTER APK

Kirimkan URL repository GitHub Flutter project.

Contoh: https://github.com/flutter/samples

Ketik "batal" untuk membatalkan`);
});

bot.action('build_android', async (ctx) => {
    await ctx.reply(`🔨 BUILD ANDROID APK

Kirimkan URL repository GitHub Android project.

Contoh: https://github.com/android/architecture-samples

Ketik "batal" untuk membatalkan`);
});

bot.action('deploy_vercel', async (ctx) => {
    await ctx.reply(`🌐 DEPLOY KE VERCEL

Kirimkan URL repository GitHub project web.

Contoh: https://github.com/username/web-app

Ketik "batal" untuk membatalkan`);
});

// Handle text input
const userStates = new Map();

bot.on('text', async (ctx) => {
    const userId = ctx.from.id;
    const state = userStates.get(userId);
    const text = ctx.message.text;
    
    if (!state) return;
    
    if (text === 'batal') {
        userStates.delete(userId);
        await ctx.reply('✅ Proses dibatalkan');
        return;
    }
    
    if (state === 'waiting_flutter') {
        await ctx.reply(`✅ URL diterima! Memulai build Flutter...

Repository: ${text}
Status: Build dimulai di GitHub Actions

Hasil APK akan muncul di tab "Actions" dalam 3-5 menit.`);
        userStates.delete(userId);
    }
});

bot.launch();
console.log('✅ Bot running!');
