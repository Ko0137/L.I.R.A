import { LaunchableApp, ActiveAlarm, CustomMacroCommand, MacroAction, FileCategory } from '../types';
import { fileScannerService, formatFileSize, formatDateString } from './fileScannerService';

export const SYSTEM_APPS: LaunchableApp[] = [
  { id: 'file_scanner', name: 'Файловый сканер', category: 'Система', icon: 'FolderSearch', keywords: ['файлы', 'сканер', 'документы', 'поиск файлов', 'загрузки', 'диск', 'проводник', 'память', 'поиск по файлам'], actionType: 'custom' },
  { id: 'camera', name: 'Камера', category: 'Система', icon: 'Camera', keywords: ['камера', 'фото', 'видео', 'снимок'], actionType: 'camera' },
  { id: 'yandex_music', name: 'Яндекс Музыка', category: 'Медиа', icon: 'Music', keywords: ['яндекс музыка', 'яндекс плей', 'я музыка', 'музыка'], actionType: 'browser', url: 'https://music.yandex.ru' },
  { id: 'browser', name: 'Браузер', category: 'Интернет', icon: 'Globe', keywords: ['браузер', 'интернет', 'хром', 'гугл', 'веб'], actionType: 'browser', url: 'https://www.google.com' },
  { id: 'notes', name: 'Заметки', category: 'Органайзер', icon: 'FileText', keywords: ['заметки', 'блокнот', 'записи'], actionType: 'notes' },
  { id: 'calc', name: 'Калькулятор', category: 'Инструменты', icon: 'Calculator', keywords: ['калькулятор', 'счет', 'вычисления'], actionType: 'calculator' },
  { id: 'media', name: 'Медиаплеер', category: 'Медиа', icon: 'Music', keywords: ['музыка', 'плеер', 'трек', 'аудио'], actionType: 'media' },
  { id: 'alarm', name: 'Будильник', category: 'Часы', icon: 'Clock', keywords: ['будильник', 'часы', 'таймер'], actionType: 'alarm' },
  { id: 'youtube', name: 'YouTube', category: 'Медиа', icon: 'Youtube', keywords: ['ютуб', 'youtube', 'видеохостинг'], actionType: 'browser', url: 'https://www.youtube.com' },
  { id: 'maps', name: 'Карты', category: 'Навигация', icon: 'MapPin', keywords: ['карты', 'навигатор', 'маршрут'], actionType: 'browser', url: 'https://www.google.com/maps' },
  { id: 'telegram', name: 'Telegram', category: 'Общение', icon: 'Send', keywords: ['телеграм', 'телеграмм', 'мессенджер', 'тг'], actionType: 'browser', url: 'https://web.telegram.org' },
  { id: 'weather', name: 'Погода', category: 'Инфо', icon: 'CloudSun', keywords: ['погода', 'прогноз'], actionType: 'browser', url: 'https://yandex.ru/pogoda' },
  { id: 'calendar', name: 'Календарь', category: 'Органайзер', icon: 'Calendar', keywords: ['календарь', 'дата', 'события'], actionType: 'browser', url: 'https://calendar.google.com' },
  { id: 'settings', name: 'Настройки', category: 'Система', icon: 'Settings', keywords: ['настройки', 'параметры'], actionType: 'custom' },
];

export interface CommandContext {
  userName: string;
  notesList: string[];
  setNotesList: (updater: (prev: string[]) => string[]) => void;
  customCommands: Record<string, string>;
  macroCommands?: CustomMacroCommand[];
  isTorchOn: boolean;
  setIsTorchOn: (updater: (prev: boolean) => boolean) => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (updater: (prev: boolean) => boolean) => void;
  onOpenApp: (app: LaunchableApp) => void;
  onOpenSettings: () => void;
  onSetAlarm: (alarm: ActiveAlarm) => void;
  onSetTimer?: (seconds: number, label: string) => void;
  onResetTimer?: () => void;
  onOpenTimer?: () => void;
  onOpenOfflineSpeech?: () => void;
  onOpenHardwareControl?: () => void;
  onOpenSmartCalc?: () => void;
  onOpenMusicPlayer?: () => void;
  onNextTrack?: () => string;
  onPrevTrack?: () => string;
  onOpenFlashlightModal?: () => void;
  onOpenFileScanner?: (query?: string, category?: FileCategory) => void;
}

function containsAny(input: string, ...keywords: string[]): boolean {
  return keywords.some(kw => input.includes(kw));
}

export async function executeCommand(
  text: string,
  context: CommandContext
): Promise<string> {
  const lower = text.toLowerCase().trim();

  // 1. Sequential Macro Commands check (e.g., "включи музыку", "утренний сценарий")
  if (context.macroCommands && context.macroCommands.length > 0) {
    for (const macro of context.macroCommands) {
      if (macro.trigger.trim() && lower.includes(macro.trigger.trim().toLowerCase())) {
        const results: string[] = [];
        for (const action of macro.actions) {
          if (action.type === 'say') {
            if (action.payload) results.push(action.payload);
          } else if (action.type === 'open_app') {
            const targetApp = SYSTEM_APPS.find(
              a => a.id === action.payload || a.name.toLowerCase() === (action.payload || '').toLowerCase()
            );
            if (targetApp) {
              context.onOpenApp(targetApp);
              results.push(`Запуск: ${targetApp.name}`);
            } else if (action.payload) {
              // Custom URL launch
              window.open(action.payload.startsWith('http') ? action.payload : `https://${action.payload}`, '_blank');
              results.push(`Открытие: ${action.payload}`);
            }
          } else if (action.type === 'music_toggle') {
            context.setIsMusicPlaying(() => true);
            results.push('Воспроизведение активировано');
          } else if (action.type === 'torch_toggle') {
            context.setIsTorchOn(prev => !prev);
            results.push('Фонарик переключен');
          } else if (action.type === 'read_notes') {
            if (context.notesList.length > 0) {
              results.push('Заметки: ' + context.notesList.join(', '));
            } else {
              results.push('Заметок нет');
            }
          } else if (action.type === 'delay') {
            const delayMs = parseInt(action.payload || '600', 10);
            await new Promise(r => setTimeout(r, isNaN(delayMs) ? 600 : delayMs));
          }
        }
        return results.join('. ') || `Сценарий «${macro.name}» выполнен.`;
      }
    }
  }

  // 2. Custom simple user commands check
  for (const [key, val] of Object.entries(context.customCommands)) {
    if (key.trim() && lower.includes(key.trim().toLowerCase())) {
      return val.trim();
    }
  }

  // 2. Alarm parser (будильник, разбуди)
  if (lower.includes('будильник') || lower.includes('разбуди')) {
    let hour = 7;
    let minute = 0;
    let found = false;

    // Pattern for HH:MM
    const timeMatch = lower.match(/(\d{1,2}):(\d{2})/);
    if (timeMatch) {
      hour = parseInt(timeMatch[1], 10);
      minute = parseInt(timeMatch[2], 10);
      found = true;
    } else {
      // Pattern for "в 8", "на 9 утра", "в 7 часов 30 минут"
      const hourMatch = lower.match(/(?:в|на)\s*(\d{1,2})(?:\s*час[а-я]*)?/);
      if (hourMatch) {
        hour = parseInt(hourMatch[1], 10);
        found = true;
        const minMatch = lower.match(/(\d{1,2})\s*мин/);
        if (minMatch) {
          minute = parseInt(minMatch[1], 10);
        }
      }
    }

    if (hour > 23) hour = 23;
    if (minute > 59) minute = 59;

    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    context.onSetAlarm({
      id: Date.now().toString(),
      time: formattedTime,
      label: 'L.I.R.A. Будильник',
      hour,
      minute,
      isActive: true,
    });

    if (found) {
      return `Устанавливаю будильник на ${formattedTime}`;
    } else {
      return `Открываю настройки будильника. Установлен на ${formattedTime}`;
    }
  }

  // 3. App launching (открой, запусти)
  if (lower.startsWith('открой ') || lower.startsWith('запусти ')) {
    const appQuery = lower.replace(/^(открой|запусти)\s+/, '').trim();

    if (appQuery.includes('камера')) {
      context.onOpenApp(SYSTEM_APPS.find(a => a.id === 'camera')!);
      return 'Запускаю камеру.';
    }

    if (appQuery.includes('браузер') || appQuery.includes('интернет')) {
      context.onOpenApp(SYSTEM_APPS.find(a => a.id === 'browser')!);
      return 'Открываю браузер.';
    }

    if (appQuery.includes('настройки')) {
      context.onOpenSettings();
      return 'Открываю настройки L.I.R.A.';
    }

    if (containsAny(appQuery, 'vosk', 'оффлайн речь', 'распознавание', 'голосовая модель')) {
      context.onOpenOfflineSpeech?.();
      return 'Открываю модуль оффлайн-распознавания речи Vosk.';
    }

    if (containsAny(appQuery, 'железо', 'управление', 'вайфай', 'блютуз', 'пульт', 'громкость')) {
      context.onOpenHardwareControl?.();
      return 'Открываю пульт управления системными функциями смартфона.';
    }

    if (containsAny(appQuery, 'калькулятор', 'конвертер', 'посчитай', 'проценты', 'умный')) {
      context.onOpenSmartCalc?.();
      return 'Запускаю инженерный калькулятор и конвертер.';
    }

    if (containsAny(appQuery, 'файлы', 'сканер', 'проводник', 'документы', 'загрузки', 'диск')) {
      context.onOpenFileScanner?.();
      return 'Открываю локальный сканер файлов и документов устройства.';
    }

    // Match against system apps
    const matchedApp = SYSTEM_APPS.find(app => 
      app.name.toLowerCase().includes(appQuery) || 
      appQuery.includes(app.name.toLowerCase()) ||
      app.keywords.some(k => appQuery.includes(k) || k.includes(appQuery))
    );

    if (matchedApp) {
      context.onOpenApp(matchedApp);
      return `Запускаю ${matchedApp.name}.`;
    }

    return `Приложение "${appQuery}" не найдено. Спросите «какие приложения есть», чтобы увидеть полный список.`;
  }

  // 3.5. List installed applications
  if (containsAny(lower, 'какие приложения', 'список приложений', 'установленные приложения', 'все приложения', 'что умеешь открывать', 'покажи приложения')) {
    const listStr = SYSTEM_APPS.map(a => `• **${a.name}** (${a.category})`).join('\n');
    return `📱 **Доступные приложения на устройстве** (${SYSTEM_APPS.length}):\n\n${listStr}\n\nВы можете сказать: *«Открой Камеру»*, *«Открой Заметки»* или *«Открой Файловый сканер»*.`;
  }

  // 3.6. Local File System Scanner & Search (Offline)
  if (
    lower.startsWith('найди ') ||
    lower.startsWith('поиск ') ||
    lower.startsWith('где лежит ') ||
    lower.startsWith('покажи файлы') ||
    lower.startsWith('покажи документы') ||
    lower.startsWith('покажи фото') ||
    lower.startsWith('покажи чеки') ||
    lower.startsWith('покажи загрузки') ||
    lower.startsWith('покажи сканы') ||
    containsAny(lower, 'файловый сканер', 'сканер файлов', 'поиск по файлам', 'просканируй файлы', 'просканируй память', 'содержит файл')
  ) {
    if (containsAny(lower, 'открой сканер', 'открой файловый сканер', 'запусти файловый сканер', 'сканер файлов', 'проводник')) {
      context.onOpenFileScanner?.();
      return '📂 Открываю локальный сканер файлов и документов устройства.';
    }

    const { items, intentDescription } = fileScannerService.naturalSearch(text);
    if (items.length === 0) {
      return `🔍 По запросу «${text}» локальных файлов не найдено.\nВы можете открыть Файловый сканер (+ кнопка выше) и проиндексировать новые файлы устройства.`;
    }

    const topItems = items.slice(0, 3);
    const formattedList = topItems
      .map(f => {
        const snippet = f.contentSnippet ? `\n   ↳ 💬 *«${f.contentSnippet.slice(0, 110)}...»*` : '';
        return `• 📄 **${f.name}** (${formatFileSize(f.sizeBytes)})\n   📁 *${f.directory}* • ${formatDateString(f.updatedAt)}${snippet}`;
      })
      .join('\n\n');

    const moreCount = items.length - topItems.length;
    const moreText = moreCount > 0 ? `\n\n... и еще ${moreCount} совпадений в памяти. Откройте Файловый сканер для подробностей.` : '';

    return `📁 **${intentDescription}**:\n\n${formattedList}${moreText}`;
  }

  // 4. Flashlight / Torch
  if (containsAny(lower, 'выключи фонарик', 'погаси свет', 'отключи фонарик', 'выключи вспышку')) {
    context.setIsTorchOn(() => false);
    return 'Фонарик выключен.';
  }

  if (containsAny(lower, 'фонарик', 'свет', 'подсвети', 'вспышка')) {
    context.setIsTorchOn(() => true);
    context.onOpenFlashlightModal?.();
    return 'Фонарик включен. Открываю панель управления.';
  }

  // 5. Battery info
  if (containsAny(lower, 'батарея', 'заряд', 'аккумулятор')) {
    try {
      if (typeof navigator !== 'undefined' && 'getBattery' in navigator) {
        const battery: any = await (navigator as any).getBattery();
        const level = Math.round(battery.level * 100);
        const charging = battery.charging ? ' (заряжается)' : '';
        return `Уровень заряда батареи: ${level}%${charging}.`;
      }
    } catch {}
    return 'Уровень заряда батареи: 85%. Система работает в штатном режиме.';
  }

  // 6. Media / Music playback
  if (containsAny(lower, 'яндекс музыка', 'включи музыку', 'поставь музыку', 'запусти музыку', 'открой музыку')) {
    context.setIsMusicPlaying(() => true);
    context.onOpenMusicPlayer?.();
    return 'Открываю плеер Яндекс Музыки и запускаю поток треков.';
  }

  if (containsAny(lower, 'следующий трек', 'следующая песня', 'переключи трек', 'включи следующий', 'дальше трек', 'следующий')) {
    const trackName = context.onNextTrack?.();
    context.setIsMusicPlaying(() => true);
    return trackName ? `Включаю следующий трек: «${trackName}».` : 'Включаю следующий трек.';
  }

  if (containsAny(lower, 'предыдущий трек', 'предыдущая песня', 'назад трек', 'включи предыдущий', 'предыдущий')) {
    const trackName = context.onPrevTrack?.();
    context.setIsMusicPlaying(() => true);
    return trackName ? `Включаю предыдущий трек: «${trackName}».` : 'Включаю предыдущий трек.';
  }

  if (containsAny(lower, 'пауза', 'стоп музыка', 'останови музыку', 'выключи музыку', 'заглуши музыку')) {
    context.setIsMusicPlaying(() => false);
    return 'Музыка поставлена на паузу.';
  }

  if (containsAny(lower, 'продолжи музыку', 'играй музыку', 'сними с паузы', 'плей', 'музыка')) {
    context.setIsMusicPlaying(() => true);
    context.onOpenMusicPlayer?.();
    return 'Продолжаю воспроизведение музыки.';
  }

  // 7. Timer commands
  if (lower.startsWith('таймер') || containsAny(lower, 'поставь таймер', 'засеки', 'запусти таймер', 'сбрось таймер', 'отмени таймер')) {
    if (containsAny(lower, 'сбрось', 'отмени', 'стоп', 'останови')) {
      context.onResetTimer?.();
      return 'Таймер остановлен и сброшен.';
    }

    // Match minutes/seconds
    // Examples: "таймер 5 минут", "таймер на 30 секунд", "засеки 10 минут чай"
    let totalSecs = 0;
    const minMatch = lower.match(/(\d+)\s*(?:мин|минут|минуты|m)/);
    const secMatch = lower.match(/(\d+)\s*(?:сек|секунд|секунды|s)/);
    const numOnlyMatch = lower.match(/таймер\s*(?:на\s*)?(\d+)(?!\s*(?:мин|сек))/);

    if (minMatch) {
      totalSecs += parseInt(minMatch[1], 10) * 60;
    }
    if (secMatch) {
      totalSecs += parseInt(secMatch[1], 10);
    }
    if (!minMatch && !secMatch && numOnlyMatch) {
      // default bare number to minutes if >= 1
      totalSecs = parseInt(numOnlyMatch[1], 10) * 60;
    }

    if (totalSecs > 0) {
      const mins = Math.floor(totalSecs / 60);
      const secs = totalSecs % 60;
      const timeStr = `${mins ? mins + ' мин ' : ''}${secs ? secs + ' сек' : ''}`.trim();
      context.onSetTimer?.(totalSecs, `Таймер на ${timeStr}`);
      return `⏱️ Таймер установлен на ${timeStr}. Отсчет пошел!`;
    }

    context.onOpenTimer?.();
    return 'Открываю окно управления таймером.';
  }

  // 8. Decision tools (Coin, Dice, 8-Ball, Random number)
  if (containsAny(lower, 'орел или решка', 'орёл или решка', 'подбрось монетку', 'брось монетку', 'монетка', 'брось монету')) {
    const isHeads = Math.random() > 0.5;
    return isHeads ? '🪙 Подбрасываю монетку... Выпал ОРЁЛ!' : '🪙 Подбрасываю монетку... Выпала РЕШКА!';
  }

  if (containsAny(lower, 'брось кубик', 'брось кости', 'кости', 'd6', 'd20', 'кубик')) {
    const isD20 = lower.includes('d20') || lower.includes('20');
    const sides = isD20 ? 20 : 6;
    const roll = Math.floor(Math.random() * sides) + 1;
    return `🎲 Бросаю ${isD20 ? 'D20' : 'кубик'}... Результат: **${roll}**!`;
  }

  if (containsAny(lower, 'магический шар', 'шар предсказаний', 'предскажи', 'шар ответов')) {
    const answers = [
      '🎱 Бесспорно, да!',
      '🎱 Определённо так и будет.',
      '🎱 Знаки говорят — да.',
      '🎱 Скорее всего, да.',
      '🎱 Спроси позже, будущее туманно.',
      '🎱 Лучше пока не рассчитывать на это.',
      '🎱 Весьма сомнительно.',
      '🎱 Мой ответ — нет.'
    ];
    return answers[Math.floor(Math.random() * answers.length)];
  }

  if (lower.startsWith('случайное число') || lower.startsWith('рандом')) {
    const rangeMatch = lower.match(/(?:от\s*)?(\d+)\s*(?:до\s*)(\d+)/);
    if (rangeMatch) {
      const min = parseInt(rangeMatch[1], 10);
      const max = parseInt(rangeMatch[2], 10);
      const rand = Math.floor(Math.random() * (max - min + 1)) + min;
      return `🔢 Случайное число от ${min} до ${max}: **${rand}**`;
    }
    const randDefault = Math.floor(Math.random() * 100) + 1;
    return `🔢 Случайное число (1–100): **${randDefault}**`;
  }

  // 9. Date, Time & Day
  if (containsAny(lower, 'который час', 'сколько времени', 'точное время', 'время')) {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    return `🕒 Текущее точное время: **${timeStr}**`;
  }

  if (containsAny(lower, 'какое число', 'какая дата', 'какой сегодня день', 'день недели')) {
    const now = new Date();
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const dateStr = `Сегодня **${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()} года**, ${days[now.getDay()]}.`;
    return `📅 ${dateStr}`;
  }

  // 10. Notes
  if (lower.includes('прочитай заметки')) {
    if (context.notesList.length === 0) {
      return 'Ваши заметки:\nЗаметок пока нет.';
    }
    return 'Ваши заметки:\n' + context.notesList.map(n => `• ${n}`).join('\n');
  }

  if (lower.includes('очисти заметки')) {
    context.setNotesList(() => []);
    return 'Все заметки стерты.';
  }

  if (lower.startsWith('заметка ') || lower.startsWith('запомни ')) {
    const newNote = text.replace(/^(?:заметка|запомни)\s+/i, '').trim();
    if (newNote) {
      context.setNotesList(prev => [...prev, newNote]);
      return `Записано: "${newNote}"`;
    }
    return 'Что именно записать?';
  }

  // 11. Greetings
  if (containsAny(lower, 'привет', 'здравствуй', 'хей', 'добрый день', 'доброе утро', 'добрый вечер')) {
    const name = context.userName || 'Пользователь';
    return `Приветствую, ${name}! Чем зайдемся?`;
  }

  // 12. Status and system info
  if (containsAny(lower, 'система', 'статус', 'системы', 'состояние')) {
    return `L.I.R.A.: Все системы активны. Доступно приложений для запуска: ${SYSTEM_APPS.length}. Нажми '?' сверху для справки!`;
  }

  // 13. Default fallback matching Android MainActivity
  return `Команда принята: ${text}`;
}
