import React, { useState, useEffect } from "react";
import "../Page.css";
import "./AISettings.css";

const AISettings = () => {
  const [settings, setSettings] = useState({
    // Model Settings
    recommendationModel: "advanced",
    routeOptimization: true,
    priceOptimization: true,
    demandPrediction: true,

    // Training Parameters
    trainingFrequency: "weekly",
    learningRate: 0.001,
    batchSize: 32,
    epochs: 100,
    dataRetention: "6months",

    // Feature Toggles
    smartMatching: true,
    predictiveAnalytics: true,
    autoResponseSystem: false,
    fraudDetection: true,
    sentimentAnalysis: true,
    chatbotAssistant: false,
    dynamicPricing: true,
    trafficPrediction: true,

    // Advanced Settings
    apiResponseTime: 500,
    confidenceThreshold: 0.8,
    fallbackEnabled: true,
    debugMode: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [modelStatus, setModelStatus] = useState({
    recommendation: "active",
    routing: "training",
    pricing: "active",
    fraud: "active",
  });

  useEffect(() => {
    // Simulate loading settings from API
    const loadSettings = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setLastSaved(new Date());
      }, 1000);
    };

    loadSettings();
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setLastSaved(new Date());
      alert("AI Settings saved successfully!");
    }, 1000);
  };

  const handleResetToDefaults = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all AI settings to default values?"
      )
    ) {
      setSettings({
        recommendationModel: "basic",
        routeOptimization: true,
        priceOptimization: false,
        demandPrediction: false,
        trainingFrequency: "monthly",
        learningRate: 0.01,
        batchSize: 16,
        epochs: 50,
        dataRetention: "3months",
        smartMatching: true,
        predictiveAnalytics: false,
        autoResponseSystem: false,
        fraudDetection: true,
        sentimentAnalysis: false,
        chatbotAssistant: false,
        dynamicPricing: false,
        trafficPrediction: false,
        apiResponseTime: 1000,
        confidenceThreshold: 0.7,
        fallbackEnabled: true,
        debugMode: false,
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusClass = {
      active: "ai-status-active",
      training: "ai-status-training",
      inactive: "ai-status-inactive",
      error: "ai-status-error",
    };

    return (
      <span className={`ai-status-badge ${statusClass[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="page">
      <div className="page-content-card">
        <div className="ai-settings-header">
          <div>
            <h1>AI Settings</h1>
            <p>
              Configure artificial intelligence and machine learning features
              for optimal system performance.
            </p>
            {lastSaved && (
              <p className="ai-last-saved">
                Last saved: {lastSaved.toLocaleString()}
              </p>
            )}
          </div>
          <div className="ai-header-actions">
            <button
              className="ai-btn ai-btn-secondary"
              onClick={handleResetToDefaults}
              disabled={isLoading}
            >
              Reset to Defaults
            </button>
            <button
              className="ai-btn ai-btn-primary"
              onClick={handleSaveSettings}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>

        <div className="ai-settings-content">
          {/* Model Status Overview */}
          <div className="ai-settings-section">
            <h2>Model Status Overview</h2>
            <div className="ai-model-status-grid">
              <div className="ai-model-status-card">
                <h4>Recommendation Engine</h4>
                {getStatusBadge(modelStatus.recommendation)}
                <p>Last trained: 2 hours ago</p>
              </div>
              <div className="ai-model-status-card">
                <h4>Route Optimization</h4>
                {getStatusBadge(modelStatus.routing)}
                <p>Training in progress: 67%</p>
              </div>
              <div className="ai-model-status-card">
                <h4>Dynamic Pricing</h4>
                {getStatusBadge(modelStatus.pricing)}
                <p>Last trained: 1 day ago</p>
              </div>
              <div className="ai-model-status-card">
                <h4>Fraud Detection</h4>
                {getStatusBadge(modelStatus.fraud)}
                <p>Last trained: 6 hours ago</p>
              </div>
            </div>
          </div>

          {/* Model Settings */}
          <div className="ai-settings-section">
            <h2>Model Settings</h2>
            <div className="ai-settings-grid">
              <div className="ai-setting-group">
                <label htmlFor="recommendationModel">
                  Recommendation Model
                </label>
                <select
                  id="recommendationModel"
                  value={settings.recommendationModel}
                  onChange={(e) =>
                    handleSettingChange("recommendationModel", e.target.value)
                  }
                  className="ai-select"
                >
                  <option value="basic">Basic Collaborative Filtering</option>
                  <option value="advanced">Advanced Neural Network</option>
                  <option value="hybrid">Hybrid Approach</option>
                  <option value="deep">Deep Learning Model</option>
                </select>
                <p className="ai-setting-description">
                  Choose the complexity level for user recommendations
                </p>
              </div>

              <div className="ai-setting-group">
                <label htmlFor="confidenceThreshold">
                  Confidence Threshold
                </label>
                <div className="ai-range-container">
                  <input
                    type="range"
                    id="confidenceThreshold"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={settings.confidenceThreshold}
                    onChange={(e) =>
                      handleSettingChange(
                        "confidenceThreshold",
                        parseFloat(e.target.value)
                      )
                    }
                    className="ai-range"
                  />
                  <span className="ai-range-value">
                    {settings.confidenceThreshold}
                  </span>
                </div>
                <p className="ai-setting-description">
                  Minimum confidence level for AI predictions
                </p>
              </div>

              <div className="ai-setting-group">
                <label htmlFor="apiResponseTime">API Response Time (ms)</label>
                <input
                  type="number"
                  id="apiResponseTime"
                  min="100"
                  max="5000"
                  step="50"
                  value={settings.apiResponseTime}
                  onChange={(e) =>
                    handleSettingChange(
                      "apiResponseTime",
                      parseInt(e.target.value)
                    )
                  }
                  className="ai-input"
                />
                <p className="ai-setting-description">
                  Maximum response time for AI API calls
                </p>
              </div>
            </div>
          </div>

          {/* Training Parameters */}
          <div className="ai-settings-section">
            <h2>Training Parameters</h2>
            <div className="ai-settings-grid">
              <div className="ai-setting-group">
                <label htmlFor="trainingFrequency">Training Frequency</label>
                <select
                  id="trainingFrequency"
                  value={settings.trainingFrequency}
                  onChange={(e) =>
                    handleSettingChange("trainingFrequency", e.target.value)
                  }
                  className="ai-select"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="manual">Manual Only</option>
                </select>
              </div>

              <div className="ai-setting-group">
                <label htmlFor="learningRate">Learning Rate</label>
                <select
                  id="learningRate"
                  value={settings.learningRate}
                  onChange={(e) =>
                    handleSettingChange(
                      "learningRate",
                      parseFloat(e.target.value)
                    )
                  }
                  className="ai-select"
                >
                  <option value={0.1}>0.1 (High)</option>
                  <option value={0.01}>0.01 (Medium)</option>
                  <option value={0.001}>0.001 (Low)</option>
                  <option value={0.0001}>0.0001 (Very Low)</option>
                </select>
              </div>

              <div className="ai-setting-group">
                <label htmlFor="batchSize">Batch Size</label>
                <select
                  id="batchSize"
                  value={settings.batchSize}
                  onChange={(e) =>
                    handleSettingChange("batchSize", parseInt(e.target.value))
                  }
                  className="ai-select"
                >
                  <option value={16}>16</option>
                  <option value={32}>32</option>
                  <option value={64}>64</option>
                  <option value={128}>128</option>
                </select>
              </div>

              <div className="ai-setting-group">
                <label htmlFor="epochs">Training Epochs</label>
                <input
                  type="number"
                  id="epochs"
                  min="10"
                  max="1000"
                  step="10"
                  value={settings.epochs}
                  onChange={(e) =>
                    handleSettingChange("epochs", parseInt(e.target.value))
                  }
                  className="ai-input"
                />
              </div>

              <div className="ai-setting-group">
                <label htmlFor="dataRetention">Data Retention Period</label>
                <select
                  id="dataRetention"
                  value={settings.dataRetention}
                  onChange={(e) =>
                    handleSettingChange("dataRetention", e.target.value)
                  }
                  className="ai-select"
                >
                  <option value="1month">1 Month</option>
                  <option value="3months">3 Months</option>
                  <option value="6months">6 Months</option>
                  <option value="1year">1 Year</option>
                  <option value="2years">2 Years</option>
                </select>
              </div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="ai-settings-section">
            <h2>AI Feature Toggles</h2>
            <div className="ai-features-grid">
              <div className="ai-feature-category">
                <h3>Core Features</h3>
                <div className="ai-toggle-list">
                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">Smart Matching</span>
                      <p className="ai-toggle-description">
                        AI-powered driver-passenger matching
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.smartMatching}
                        onChange={(e) =>
                          handleSettingChange("smartMatching", e.target.checked)
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">
                        Route Optimization
                      </span>
                      <p className="ai-toggle-description">
                        Intelligent route planning and optimization
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.routeOptimization}
                        onChange={(e) =>
                          handleSettingChange(
                            "routeOptimization",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">Dynamic Pricing</span>
                      <p className="ai-toggle-description">
                        AI-based dynamic pricing optimization
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.dynamicPricing}
                        onChange={(e) =>
                          handleSettingChange(
                            "dynamicPricing",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">Fraud Detection</span>
                      <p className="ai-toggle-description">
                        Real-time fraud detection and prevention
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.fraudDetection}
                        onChange={(e) =>
                          handleSettingChange(
                            "fraudDetection",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="ai-feature-category">
                <h3>Analytics & Insights</h3>
                <div className="ai-toggle-list">
                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">
                        Predictive Analytics
                      </span>
                      <p className="ai-toggle-description">
                        Demand forecasting and trend analysis
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.predictiveAnalytics}
                        onChange={(e) =>
                          handleSettingChange(
                            "predictiveAnalytics",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">
                        Sentiment Analysis
                      </span>
                      <p className="ai-toggle-description">
                        Analyze customer feedback sentiment
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.sentimentAnalysis}
                        onChange={(e) =>
                          handleSettingChange(
                            "sentimentAnalysis",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">
                        Traffic Prediction
                      </span>
                      <p className="ai-toggle-description">
                        Real-time traffic pattern prediction
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.trafficPrediction}
                        onChange={(e) =>
                          handleSettingChange(
                            "trafficPrediction",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">Demand Prediction</span>
                      <p className="ai-toggle-description">
                        Predict service demand patterns
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.demandPrediction}
                        onChange={(e) =>
                          handleSettingChange(
                            "demandPrediction",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="ai-feature-category">
                <h3>Customer Service</h3>
                <div className="ai-toggle-list">
                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">Chatbot Assistant</span>
                      <p className="ai-toggle-description">
                        AI-powered customer support chatbot
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.chatbotAssistant}
                        onChange={(e) =>
                          handleSettingChange(
                            "chatbotAssistant",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>

                  <div className="ai-toggle-item">
                    <div className="ai-toggle-info">
                      <span className="ai-toggle-label">
                        Auto Response System
                      </span>
                      <p className="ai-toggle-description">
                        Automated responses to common queries
                      </p>
                    </div>
                    <label className="ai-toggle-switch">
                      <input
                        type="checkbox"
                        checked={settings.autoResponseSystem}
                        onChange={(e) =>
                          handleSettingChange(
                            "autoResponseSystem",
                            e.target.checked
                          )
                        }
                      />
                      <span className="ai-toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="ai-settings-section">
            <h2>Advanced Settings</h2>
            <div className="ai-advanced-settings">
              <div className="ai-toggle-item">
                <div className="ai-toggle-info">
                  <span className="ai-toggle-label">Fallback Mode</span>
                  <p className="ai-toggle-description">
                    Enable fallback to traditional algorithms when AI fails
                  </p>
                </div>
                <label className="ai-toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.fallbackEnabled}
                    onChange={(e) =>
                      handleSettingChange("fallbackEnabled", e.target.checked)
                    }
                  />
                  <span className="ai-toggle-slider"></span>
                </label>
              </div>

              <div className="ai-toggle-item">
                <div className="ai-toggle-info">
                  <span className="ai-toggle-label">Debug Mode</span>
                  <p className="ai-toggle-description">
                    Enable detailed logging for AI operations (affects
                    performance)
                  </p>
                </div>
                <label className="ai-toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.debugMode}
                    onChange={(e) =>
                      handleSettingChange("debugMode", e.target.checked)
                    }
                  />
                  <span className="ai-toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Training Actions */}
          <div className="ai-settings-section">
            <h2>Model Training Actions</h2>
            <div className="ai-training-actions">
              <button className="ai-btn ai-btn-training">
                Trigger Manual Training
              </button>
              <button className="ai-btn ai-btn-secondary">
                Download Training Logs
              </button>
              <button className="ai-btn ai-btn-secondary">
                Export Model Metrics
              </button>
              <button className="ai-btn ai-btn-danger">Reset All Models</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISettings;
