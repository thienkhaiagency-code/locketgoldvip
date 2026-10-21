function safeJson(s, fb) { try { return JSON.parse(s); } catch { return fb; } }
function deepMerge(base, patch) { for (const k of Object.keys(patch)) { const v = patch[k]; if (v && typeof v === "object" && !Array.isArray(v) && base[k] && typeof base[k] === "object" && !Array.isArray(base[k])) deepMerge(base[k], v); else base[k] = v; } return base; }
function setJsonString(e, k, patch) { e[k] = JSON.stringify(deepMerge(safeJson(e[k] || "{}", {}), patch)); }
function setStr(e, k, v) { e[k] = String(v); }

const startISO = "2026-02-28T00:00:00Z";
const endISO = "9999-12-31T23:59:59Z";
const fakeSub = { expires_date: endISO, purchase_date: startISO, original_purchase_date: startISO, ownership_type: "PURCHASED", display_name: "locket_1600_1y", is_sandbox: true, store: "app_store" };
const fakeEnt = { expires_date: endISO, purchase_date: startISO, product_identifier: "locket_1600_1y" };

const rurl = $request.url;
const body = safeJson($response.body, null);

if (rurl.includes("api.revenuecat.com") && body && body.subscriber) {
    body.subscriber.subscriptions = body.subscriber.subscriptions || {};
    body.subscriber.entitlements = body.subscriber.entitlements || {};
    body.subscriber.subscriptions["locket_1600_1y"] = fakeSub;
    body.subscriber.entitlements["Gold"] = fakeEnt;
    $done({ body: JSON.stringify(body) });
} else if (rurl.includes("firebaseremoteconfig") && body) {
    body.entries = body.entries || {};
    const e = body.entries;
    
    setStr(e, "profile_badge_visible", "true");
    setJsonString(e, "subscriptions", { "locket_1600_1y": fakeSub });
    setJsonString(e, "entitlements", { "Gold": fakeEnt });
    setJsonString(e, "feature_gates", { app_icon_picker: "enabled", camera_roll: "enabled", camera_theme: "enabled", remove_ads: "enabled", custom_widget_frames: "enabled", video: "enabled", longer_video: "enabled" });
    setJsonString(e, "camera", { max_duration: 60.0, maxDuration: 60.0 });
    
    setStr(e, "profile_cover_url", "https://i.ibb.co/1Yt1Dzzy/Shin-chan-1.png");
    setStr(e, "profile_cover_image_url", "https://i.ibb.co/1Yt1Dzzy/Shin-chan-1.png");
    setStr(e, "cover_image", "https://i.ibb.co/1Yt1Dzzy/Shin-chan-1.png");
    
    setJsonString(e, "widget_frame_event", { uid: "custom", url: "https://ibb.co/xSWdqy5V", start_at: "2020-01-01T00:00:00", end_at: "2099-12-31T23:59:59" });
    
    e.overlay_items = JSON.stringify([{ section: "🎨 Web", items: [{ overlay_id: "cap", source: "remote", caption: { background: { colors: ["#ff416c", "#8a2387"] }, text: "iutdyy", text_color: "#FFFFFF", type: "static_content" } }] }]);
    
    $done({ body: JSON.stringify(body) });
} else { $done({}); }