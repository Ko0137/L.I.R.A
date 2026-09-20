package com.lira.assistant;

import android.Manifest;
import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.Window;
import android.widget.Button;
import android.widget.Toast;
import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.google.android.material.switchmaterial.SwitchMaterial;

public class SettingsDialog extends Dialog {
    private final Activity activity;

    public SettingsDialog(@NonNull Activity activity) {
        super(activity);
        this.activity = activity;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.dialog_settings);

        SwitchMaterial switchMic = findViewById(R.id.switch_mic);
        SwitchMaterial switchPedometer = findViewById(R.id.switch_pedometer);
        SwitchMaterial switchCamera = findViewById(R.id.switch_camera);
        SwitchMaterial switchOverlay = findViewById(R.id.switch_overlay);
        Button btnClose = findViewById(R.id.btn_close_settings);

        // Check current status
        boolean micGranted = ContextCompat.checkSelfPermission(activity, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED;
        switchMic.setChecked(micGranted);

        boolean pedometerGranted = true;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            pedometerGranted = ContextCompat.checkSelfPermission(activity, Manifest.permission.ACTIVITY_RECOGNITION) == PackageManager.PERMISSION_GRANTED;
        }
        switchPedometer.setChecked(pedometerGranted);

        boolean cameraGranted = ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED;
        switchCamera.setChecked(cameraGranted);

        boolean overlayGranted = Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(activity);
        switchOverlay.setChecked(overlayGranted);

        // Switch Listeners
        switchMic.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (isChecked && ContextCompat.checkSelfPermission(activity, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.RECORD_AUDIO}, 101);
            }
        });

        switchPedometer.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (isChecked && Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                if (ContextCompat.checkSelfPermission(activity, Manifest.permission.ACTIVITY_RECOGNITION) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.ACTIVITY_RECOGNITION}, 102);
                }
            }
        });

        switchCamera.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (isChecked && ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(activity, new String[]{Manifest.permission.CAMERA}, 103);
            }
        });

        switchOverlay.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (isChecked) {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(activity)) {
                    Toast.makeText(activity, "Разрешите показ поверх других окон в настройках", Toast.LENGTH_LONG).show();
                    Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:" + activity.getPackageName()));
                    activity.startActivity(intent);
                } else {
                    startFloatingService();
                }
            } else {
                try {
                    Intent intent = new Intent(activity, FloatingWidgetService.class);
                    activity.stopService(intent);
                    Toast.makeText(activity, "Плавающий виджет отключен", Toast.LENGTH_SHORT).show();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });

        btnClose.setOnClickListener(v -> dismiss());
    }

    private void startFloatingService() {
        try {
            Intent intent = new Intent(activity, FloatingWidgetService.class);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                activity.startForegroundService(intent);
            } else {
                activity.startService(intent);
            }
            Toast.makeText(activity, "Плавающий виджет запущен!", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(activity, "Не удалось запустить виджет", Toast.LENGTH_SHORT).show();
        }
    }
}
