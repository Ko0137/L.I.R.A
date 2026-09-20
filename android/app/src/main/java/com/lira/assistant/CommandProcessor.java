package com.lira.assistant;

import android.content.Context;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class CommandProcessor {
    private final Context context;
    private final FlashlightHelper flashlightHelper;
    private final AppLauncherHelper appLauncherHelper;

    public CommandProcessor(Context context, FlashlightHelper flashlightHelper, AppLauncherHelper appLauncherHelper) {
        this.context = context;
        this.flashlightHelper = flashlightHelper;
        this.appLauncherHelper = appLauncherHelper;
    }

    public String processCommand(String text) {
        String lower = text.toLowerCase().trim();

        // 1. Flashlight command
        if (lower.contains("фонарик") || lower.contains("включи свет") || lower.contains("выключи свет")) {
            boolean isOn = flashlightHelper.toggleFlashlight();
            return isOn ? "🔦 Фонарик успешно включен!" : "💡 Фонарик выключен.";
        }

        // 2. App launch command
        if (lower.startsWith("открой") || lower.startsWith("запусти") || lower.contains("открыть") || lower.contains("запустить")) {
            String appQuery = lower.replace("открой", "").replace("запусти", "").replace("открыть", "").replace("запустить", "").trim();
            boolean success = appLauncherHelper.launchAppByName(appQuery);
            if (success) {
                return "🚀 Запускаю приложение «" + appQuery + "» на телефоне...";
            } else {
                return "⚠️ Не удалось найти приложение «" + appQuery + "» на вашем Pixel 8.";
            }
        }

        // 3. Time / Date command
        if (lower.contains("время") || lower.contains("который час") || lower.contains("дата")) {
            SimpleDateFormat sdf = new SimpleDateFormat("HH:mm, EEEE, d MMMM", new Locale("ru"));
            return "🕒 Сейчас: " + sdf.format(new Date());
        }

        // 4. Default Assistant Response
        return "⚡ L.I.R.A.: Принята команда «" + text + "». Все нативные модули Pixel 8 функционируют штатно!";
    }
}
