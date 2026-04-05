package com.airgesture.pro

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Bundle
import android.provider.Settings
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        checkPermissions()
        
        setContent {
            AppTheme {
                DashboardScreen(
                    onEnableAccessibility = { openAccessibilitySettings() },
                    onToggleGesture = { gesture, enabled ->
                        // Handle gesture toggle
                    }
                )
            }
        }
    }

    private fun checkPermissions() {
        val permissions = arrayOf(
            Manifest.permission.CAMERA,
            Manifest.permission.READ_PHONE_STATE,
            Manifest.permission.ANSWER_PHONE_CALLS
        )
        val missing = permissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }
        if (missing.isNotEmpty()) {
            ActivityCompat.requestPermissions(this, missing.toTypedArray(), 101)
        }
    }

    private fun openAccessibilitySettings() {
        val intent = Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
        startActivity(intent)
    }
}

@Composable
fun AppTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = darkColorScheme(
            primary = androidx.compose.ui.graphics.Color(0xFF00E5FF),
            secondary = androidx.compose.ui.graphics.Color(0xFF7C4DFF),
            background = androidx.compose.ui.graphics.Color(0xFF121212),
            surface = androidx.compose.ui.graphics.Color(0xFF1E1E1E)
        ),
        content = content
    )
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(
    onEnableAccessibility: () -> Unit,
    onToggleGesture: (String, Boolean) -> Unit
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Air Gesture Control Pro") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MaterialTheme.colorScheme.surface
                )
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            StatusCard(onEnableAccessibility)
            
            Text("Gestures", style = MaterialTheme.typography.titleLarge)
            
            GestureItem(
                name = "Hand Wave",
                description = "Answer calls or change songs",
                icon = Icons.Default.WavingHand,
                onToggle = { onToggleGesture("wave", it) }
            )
            
            GestureItem(
                name = "Proximity",
                description = "Go Home or Back",
                icon = Icons.Default.Sensors,
                onToggle = { onToggleGesture("proximity", it) }
            )
            
            GestureItem(
                name = "Shake",
                description = "Toggle Flashlight",
                icon = Icons.Default.FlashlightOn,
                onToggle = { onToggleGesture("shake", it) }
            )
            
            GestureItem(
                name = "Flip",
                description = "Silent Mode",
                icon = Icons.Default.PhonelinkRing,
                onToggle = { onToggleGesture("flip", it) }
            )
        }
    }
}

@Composable
fun StatusCard(onEnableAccessibility: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.secondaryContainer)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Default.Info, contentDescription = null)
                Spacer(Modifier.width(8.dp))
                Text("Service Status: Inactive", style = MaterialTheme.typography.titleMedium)
            }
            Spacer(Modifier.height(8.dp))
            Text("Enable the Accessibility Service to start controlling your phone with gestures.")
            Spacer(Modifier.height(16.dp))
            Button(onClick = onEnableAccessibility, modifier = Modifier.align(Alignment.End)) {
                Text("Enable Service")
            }
        }
    }
}

@Composable
fun GestureItem(
    name: String,
    description: String,
    icon: ImageVector,
    onToggle: (Boolean) -> Unit
) {
    var enabled by remember { mutableStateOf(true) }
    
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface)
    ) {
        Row(
            modifier = Modifier.padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(icon, contentDescription = null, tint = MaterialTheme.colorScheme.primary)
            Spacer(Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(name, style = MaterialTheme.typography.titleMedium)
                Text(description, style = MaterialTheme.typography.bodySmall)
            }
            Switch(
                checked = enabled,
                onCheckedChange = {
                    enabled = it
                    onToggle(it)
                }
            )
        }
    }
}
