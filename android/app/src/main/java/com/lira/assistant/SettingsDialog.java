package com.lira.assistant;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.Button;
import android.widget.Toast;
import androidx.annotation.NonNull;

public class SettingsDialog extends Dialog {

    public SettingsDialog(@NonNull Context context) {
        super(context);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setTitle("Настройки L.I.R.A.");

        Button btnFloating = new Button(getContext());
        btnFloating.setText("Включить Плавающий Виджет поверх окон");
        btnFloating.setOnClickListener(v -> {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(getContext())) {
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + getContext().getPackageName()));
                getContext().startActivity(intent);
            } else {
                Intent intent = new Intent(getContext(), FloatingWidgetService.class);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    getContext().startForegroundService(intent);
                } else {
                    getContext().startService(intent);
                }
                Toast.makeText(getContext(), "Плавающий виджет запущен!", Toast.LENGTH_SHORT).show();
                dismiss();
            }
        });

        setContentView(btnFloating);
    }
}
