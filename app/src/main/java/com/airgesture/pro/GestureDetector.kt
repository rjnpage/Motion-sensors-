package com.airgesture.pro

import android.util.Log
import androidx.camera.core.ImageProxy
import java.nio.ByteBuffer

class GestureDetector(private val onGestureDetected: (GestureType) -> Unit) {

    enum class GestureType {
        WAVE_LEFT,
        WAVE_RIGHT,
        PALM_DETECTED
    }

    private var lastAverageBrightness = 0f
    private val brightnessThreshold = 20f

    fun analyzeImage(image: ImageProxy) {
        val buffer = image.planes[0].buffer
        val data = buffer.toByteArray()
        
        // Simple brightness analysis
        var totalBrightness = 0L
        for (pixel in data) {
            totalBrightness += (pixel.toInt() and 0xFF)
        }
        
        val averageBrightness = totalBrightness.toFloat() / data.size
        
        if (lastAverageBrightness != 0f) {
            val diff = Math.abs(averageBrightness - lastAverageBrightness)
            if (diff > brightnessThreshold) {
                Log.d("GestureDetector", "Significant motion detected: $diff")
                // In a real app, we'd analyze the motion direction
                onGestureDetected(GestureType.WAVE_LEFT)
            }
        }
        
        lastAverageBrightness = averageBrightness
    }

    private fun ByteBuffer.toByteArray(): ByteArray {
        rewind()
        val data = ByteArray(remaining())
        get(data)
        return data
    }
}
