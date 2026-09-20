import { IndexedFileItem, FileCategory, FileFilterOptions } from '../types';

const STORAGE_KEY = 'lira_indexed_files_v1';

export const INITIAL_FILES: IndexedFileItem[] = [
  {
    id: 'doc-1',
    name: 'Паспорт_Скан_РФ_Копия.pdf',
    extension: 'pdf',
    category: 'document',
    directory: 'Documents/Личные документы/',
    sizeBytes: 2450000, // 2.45 MB
    updatedAt: '2026-09-15T14:20:00',
    contentSnippet: 'Паспорт гражданина РФ. Выдан подразделением УФМС. Серия 4518 №928412. Код подразделения 770-012. Зарегистрирован: г. Москва.',
    tags: ['паспорт', 'документ', 'удостоверение', 'личное', 'скан'],
    isStarred: true,
    mimeType: 'application/pdf',
  },
  {
    id: 'doc-2',
    name: 'Договор_Аренды_Квартиры_2026.docx',
    extension: 'docx',
    category: 'document',
    directory: 'Documents/Юридические/',
    sizeBytes: 420000, // 420 KB
    updatedAt: '2026-09-18T10:15:00',
    contentSnippet: 'ДОГОВОР НАЙМА ЖИЛОГО ПОМЕЩЕНИЯ № 42-А. Арендодатель передает в пользование квартиру по адресу: ул. Тверская, 12, кв 45. Ежемесячная плата: 65 000 рублей.',
    tags: ['договор', 'аренда', 'квартира', 'жилье', 'найм', 'оплата'],
    isStarred: true,
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
  {
    id: 'doc-3',
    name: 'Отчет_Расходы_3_Квартал.xlsx',
    extension: 'xlsx',
    category: 'document',
    directory: 'Documents/Финансы/',
    sizeBytes: 890000, // 890 KB
    updatedAt: '2026-09-19T18:45:00',
    contentSnippet: 'Финансовая сводка за 3 квартал 2026 года. Итого доходов: 450 000 ₽. Итого расходов: 280 000 ₽. Инвестиции: 75 000 ₽. Баланс: +95 000 ₽.',
    tags: ['отчет', 'финансы', 'расходы', 'квартал', 'доходы', 'бюджет'],
    isStarred: false,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  },
  {
    id: 'doc-4',
    name: 'Резюме_Senior_Developer_2026.pdf',
    extension: 'pdf',
    category: 'document',
    directory: 'Documents/Карьера/',
    sizeBytes: 310000, // 310 KB
    updatedAt: '2026-09-10T12:00:00',
    contentSnippet: 'Резюме. Frontend & Mobile Full-Stack Engineer. Опыт 6+ лет: React, TypeScript, Node.js, AI Integration, Tailwind, Offline-first PWA, Web Audio.',
    tags: ['резюме', 'cv', 'работа', 'вакансии', 'developer'],
    isStarred: false,
    mimeType: 'application/pdf',
  },
  {
    id: 'img-1',
    name: 'Чек_Покупка_Кофемашина_DNS.jpg',
    extension: 'jpg',
    category: 'image',
    directory: 'DCIM/Receipts/',
    sizeBytes: 1650000, // 1.65 MB
    updatedAt: '2026-09-20T09:12:00',
    contentSnippet: 'Кассовый чек № 8912. Магазин DNS. Кофемашина DeLonghi Magnifica S. Сумма: 39 990.00 руб. Оплата картой МИР. Гарантия 24 мес.',
    tags: ['чек', 'покупка', 'кофе', 'dns', 'гарантия', 'оплата'],
    isStarred: true,
    mimeType: 'image/jpeg',
  },
  {
    id: 'img-2',
    name: 'Скриншот_Билеты_Сапсан_Москва_СПб.png',
    extension: 'png',
    category: 'image',
    directory: 'Pictures/Screenshots/',
    sizeBytes: 1120000, // 1.12 MB
    updatedAt: '2026-09-17T16:30:00',
    contentSnippet: 'Электронный билет РЖД. Сапсан 758А. Москва Ленинградская -> Санкт-Петербург Главный. Отправление 25 сентября 07:00, Вагон 03, Место 15.',
    tags: ['билеты', 'поезд', 'сапсан', 'ржд', 'поездка', 'москва', 'питер'],
    isStarred: true,
    mimeType: 'image/png',
  },
  {
    id: 'img-3',
    name: 'Фото_Счетчик_Воды_Сентябрь.jpg',
    extension: 'jpg',
    category: 'image',
    directory: 'DCIM/Camera/',
    sizeBytes: 3200000, // 3.2 MB
    updatedAt: '2026-09-19T20:10:00',
    contentSnippet: 'Показания счетчиков: Горячая вода ХВС 0481.3, Холодная вода ГВС 0892.1. Дата съемки 19 сентября.',
    tags: ['жкх', 'счетчики', 'вода', 'квартира'],
    isStarred: false,
    mimeType: 'image/jpeg',
  },
  {
    id: 'dl-1',
    name: 'vosk_model_ru_offline_small.zip',
    extension: 'zip',
    category: 'download',
    directory: 'Downloads/AI_Models/',
    sizeBytes: 45000000, // 45 MB
    updatedAt: '2026-09-14T11:00:00',
    contentSnippet: 'Vosk Offline Russian Speech-to-Text acoustic and language model small-ru-0.22. Локальное распознавание без интернета.',
    tags: ['vosk', 'распознавание', 'модель', 'zip', 'офлайн'],
    isStarred: false,
    mimeType: 'application/zip',
  },
  {
    id: 'dl-2',
    name: 'Telegram_Desktop_Setup.exe',
    extension: 'exe',
    category: 'download',
    directory: 'Downloads/',
    sizeBytes: 38500000, // 38.5 MB
    updatedAt: '2026-09-12T15:20:00',
    contentSnippet: 'Установочный файл Telegram Desktop Messenger x64 v4.16.8.',
    tags: ['telegram', 'инсталлятор', 'мессенджер', 'программа'],
    isStarred: false,
    mimeType: 'application/x-msdownload',
  },
  {
    id: 'dl-3',
    name: 'Электронная_Книга_Мастер_И_Маргарита.epub',
    extension: 'epub',
    category: 'download',
    directory: 'Downloads/Books/',
    sizeBytes: 1800000, // 1.8 MB
    updatedAt: '2026-09-08T22:15:00',
    contentSnippet: 'Михаил Булгаков. Мастер и Маргарита. Роман. "Однажды весною, в час небывало жаркого заката, в Москве, на Патриарших прудах..."',
    tags: ['книга', 'литература', 'булгаков', 'роман', 'чтение'],
    isStarred: false,
    mimeType: 'application/epub+zip',
  },
  {
    id: 'aud-1',
    name: 'Диктофон_Запись_Идеи_Стартапа.m4a',
    extension: 'm4a',
    category: 'audio',
    directory: 'Audio/VoiceRecorder/',
    sizeBytes: 4800000, // 4.8 MB
    updatedAt: '2026-09-16T19:40:00',
    contentSnippet: 'Голосовая заметка: Разработка автономного AI-ассистента L.I.R.A. с локальным распознаванием речи, защитой приватности и сканером файлов.',
    tags: ['диктофон', 'голос', 'идея', 'стартап', 'запись'],
    isStarred: true,
    mimeType: 'audio/mp4',
  },
  {
    id: 'code-1',
    name: 'lira_voice_engine_config.json',
    extension: 'json',
    category: 'code',
    directory: 'Documents/Configs/',
    sizeBytes: 14500, // 14.5 KB
    updatedAt: '2026-09-20T06:30:00',
    contentSnippet: '{\n  "version": "1.2.0",\n  "offlineMode": true,\n  "speechEngine": "vosk",\n  "sampleRate": 16000,\n  "privacyPolicyAccepted": true,\n  "localIndexEnabled": true\n}',
    tags: ['конфиг', 'json', 'настройки', 'код'],
    isStarred: false,
    mimeType: 'application/json',
  },
];

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function formatDateString(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return d.toLocaleString('ru-RU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return isoString;
  }
}

class FileScannerService {
  private files: IndexedFileItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') {
      this.files = [...INITIAL_FILES];
      return;
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.files = parsed;
          return;
        }
      }
    } catch {}
    this.files = [...INITIAL_FILES];
    this.saveToStorage();
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.files));
      } catch {}
    }
  }

  getAllFiles(): IndexedFileItem[] {
    return this.files;
  }

  addFile(file: IndexedFileItem) {
    this.files = [file, ...this.files.filter(f => f.id !== file.id)];
    this.saveToStorage();
  }

  deleteFile(id: string) {
    this.files = this.files.filter(f => f.id !== id);
    this.saveToStorage();
  }

  toggleStar(id: string) {
    this.files = this.files.map(f => (f.id === id ? { ...f, isStarred: !f.isStarred } : f));
    this.saveToStorage();
  }

  resetToDefaults() {
    this.files = [...INITIAL_FILES];
    this.saveToStorage();
  }

  /**
   * Scan actual files from user device via File API or drag & drop.
   * Completely local in-browser memory without network transmission!
   */
  async scanDeviceFiles(fileList: FileList | File[]): Promise<IndexedFileItem[]> {
    const newItems: IndexedFileItem[] = [];
    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
      let category: FileCategory = 'other';
      const ext = file.name.split('.').pop()?.toLowerCase() || '';

      if (['pdf', 'docx', 'doc', 'txt', 'rtf', 'xlsx', 'xls', 'pptx', 'ppt', 'md', 'epub'].includes(ext)) {
        category = 'document';
      } else if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg', 'heic', 'bmp'].includes(ext)) {
        category = 'image';
      } else if (['zip', 'rar', '7z', 'tar', 'gz', 'apk', 'exe', 'msi', 'dmg', 'iso'].includes(ext)) {
        category = 'download';
      } else if (['mp3', 'wav', 'm4a', 'flac', 'aac', 'ogg'].includes(ext)) {
        category = 'audio';
      } else if (['js', 'ts', 'jsx', 'tsx', 'py', 'json', 'html', 'css', 'sql', 'sh'].includes(ext)) {
        category = 'code';
      }

      let snippet = `Файл ${file.name} (${formatFileSize(file.size)}). Тип: ${file.type || ext}.`;
      let previewUrl: string | undefined = undefined;

      // Extract text snippet from text-based files
      if (
        category === 'code' ||
        ext === 'txt' ||
        ext === 'md' ||
        ext === 'json' ||
        file.type.startsWith('text/')
      ) {
        try {
          const text = await file.text();
          snippet = text.slice(0, 400).trim() || snippet;
        } catch {}
      } else if (category === 'image') {
        try {
          previewUrl = URL.createObjectURL(file);
          snippet = `Изображение ${file.name}, размер ${formatFileSize(file.size)}.`;
        } catch {}
      }

      const item: IndexedFileItem = {
        id: 'scanned-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        name: file.name,
        extension: ext,
        category,
        directory: (file as any).webkitRelativePath
          ? (file as any).webkitRelativePath.split('/').slice(0, -1).join('/') + '/'
          : 'Storage/Scanned/',
        sizeBytes: file.size,
        updatedAt: new Date(file.lastModified || Date.now()).toISOString(),
        contentSnippet: snippet,
        tags: [ext, category, 'локальный скан'],
        previewDataUrl: previewUrl,
        isStarred: false,
        mimeType: file.type,
        isUserScanned: true,
      };

      newItems.push(item);
    }

    this.files = [...newItems, ...this.files];
    this.saveToStorage();
    return newItems;
  }

  /**
   * Search files using query & multi-filter logic.
   */
  searchFiles(options: FileFilterOptions): IndexedFileItem[] {
    const {
      query = '',
      category = 'all',
      dateRange = 'all',
      sizeRange = 'all',
      sortBy = 'date',
      sortDirection = 'desc',
    } = options;

    const lowerQuery = query.toLowerCase().trim();
    const now = new Date().getTime();

    const filtered = this.files.filter(item => {
      // 1. Category check
      if (category !== 'all' && item.category !== category) {
        return false;
      }

      // 2. Query check (name, extension, directory, tags, contentSnippet)
      if (lowerQuery) {
        const matchesName = item.name.toLowerCase().includes(lowerQuery);
        const matchesExt = item.extension.toLowerCase().includes(lowerQuery);
        const matchesDir = item.directory.toLowerCase().includes(lowerQuery);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(lowerQuery));
        const matchesContent = item.contentSnippet.toLowerCase().includes(lowerQuery);

        if (!matchesName && !matchesExt && !matchesDir && !matchesTags && !matchesContent) {
          return false;
        }
      }

      // 3. Date range check
      if (dateRange !== 'all') {
        const fileTime = new Date(item.updatedAt).getTime();
        const diffMs = now - fileTime;
        const diffDays = diffMs / (1000 * 60 * 60 * 24);

        if (dateRange === 'today' && diffDays > 1.2) return false;
        if (dateRange === 'week' && diffDays > 7.5) return false;
        if (dateRange === 'month' && diffDays > 31) return false;
        if (dateRange === 'year' && diffDays > 366) return false;
      }

      // 4. Size range check
      if (sizeRange !== 'all') {
        if (sizeRange === 'small' && item.sizeBytes >= 1024 * 1024) return false; // < 1MB
        if (
          sizeRange === 'medium' &&
          (item.sizeBytes < 1024 * 1024 || item.sizeBytes > 50 * 1024 * 1024)
        )
          return false; // 1-50MB
        if (sizeRange === 'large' && item.sizeBytes <= 50 * 1024 * 1024) return false; // > 50MB
      }

      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      let comp = 0;
      if (sortBy === 'date') {
        comp = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else if (sortBy === 'size') {
        comp = b.sizeBytes - a.sizeBytes;
      } else if (sortBy === 'name') {
        comp = a.name.localeCompare(b.name);
      }
      return sortDirection === 'asc' ? -comp : comp;
    });

    return filtered;
  }

  /**
   * Natural Language Query Parser for LIRA voice commands
   */
  naturalSearch(input: string): { items: IndexedFileItem[]; intentDescription: string } {
    const lower = input.toLowerCase().trim();

    let category: FileCategory = 'all';
    let dateRange: 'all' | 'today' | 'week' | 'month' | 'year' = 'all';
    let cleanQuery = lower
      .replace(
        /^(найди|поиск|где лежит|покажи|открой|найди файл|найди документ|найди фото|найди чек|найди чек за|найди сканы|поищи)\s+/i,
        ''
      )
      .trim();

    if (lower.includes('документ') || lower.includes('доки') || lower.includes('пдф') || lower.includes('pdf') || lower.includes('ворд') || lower.includes('word')) {
      category = 'document';
      cleanQuery = cleanQuery.replace(/(документ|доки|пдф|pdf|ворд|word|документы)\s*/gi, '').trim();
    } else if (lower.includes('фото') || lower.includes('картинк') || lower.includes('изображен') || lower.includes('скриншот') || lower.includes('снимок')) {
      category = 'image';
      cleanQuery = cleanQuery.replace(/(фото|картинки|картинку|изображение|скриншот|снимок|фотографии)\s*/gi, '').trim();
    } else if (lower.includes('загрузк') || lower.includes('скачанн') || lower.includes('downloads') || lower.includes('архив')) {
      category = 'download';
      cleanQuery = cleanQuery.replace(/(загрузки|скачанные файлы|скачанные|загруженное|downloads|архивы)\s*/gi, '').trim();
    } else if (lower.includes('аудио') || lower.includes('музык') || lower.includes('диктофон') || lower.includes('запись')) {
      category = 'audio';
      cleanQuery = cleanQuery.replace(/(аудио|музыка|диктофон|запись|трек)\s*/gi, '').trim();
    }

    if (lower.includes('сегодня')) {
      dateRange = 'today';
      cleanQuery = cleanQuery.replace(/сегодня\s*/gi, '').trim();
    } else if (lower.includes('за эту неделю') || lower.includes('за неделю') || lower.includes('на этой неделе')) {
      dateRange = 'week';
      cleanQuery = cleanQuery.replace(/(за эту неделю|за неделю|на этой неделе)\s*/gi, '').trim();
    } else if (lower.includes('за месяц') || lower.includes('в этом месяце')) {
      dateRange = 'month';
      cleanQuery = cleanQuery.replace(/(за месяц|в этом месяце)\s*/gi, '').trim();
    }

    const items = this.searchFiles({
      query: cleanQuery,
      category,
      dateRange,
      sortBy: 'date',
    });

    let desc = `Найдено файлов: ${items.length}`;
    if (cleanQuery) desc += ` по запросу «${cleanQuery}»`;
    if (category !== 'all') desc += ` [Категория: ${category}]`;
    if (dateRange !== 'all') desc += ` [Период: ${dateRange}]`;

    return { items, intentDescription: desc };
  }

  /**
   * Storage usage breakdown
   */
  getStorageStats() {
    let totalBytes = 0;
    const categoryStats: Record<string, { count: number; bytes: number }> = {
      document: { count: 0, bytes: 0 },
      image: { count: 0, bytes: 0 },
      download: { count: 0, bytes: 0 },
      audio: { count: 0, bytes: 0 },
      archive: { count: 0, bytes: 0 },
      code: { count: 0, bytes: 0 },
      other: { count: 0, bytes: 0 },
    };

    for (const f of this.files) {
      totalBytes += f.sizeBytes;
      if (categoryStats[f.category]) {
        categoryStats[f.category].count += 1;
        categoryStats[f.category].bytes += f.sizeBytes;
      }
    }

    return {
      totalFiles: this.files.length,
      totalBytes,
      formattedTotal: formatFileSize(totalBytes),
      categoryStats,
    };
  }
}

export const fileScannerService = new FileScannerService();
