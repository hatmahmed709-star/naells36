# لواء 36 - Android Offline App

هذا المستودع يحتوي على مشروع Android بسيط يفتح صفحة HTML داخل تطبيق WebView، بحيث يعمل دون اتصال بالإنترنت.

## ما الذي يحتويه المشروع

- تطبيق Android يفتح `index.html` مباشرة من مجلد `assets`
- دعم تشغيل الصفحة بالكامل Offline
- واجهة عربية RTL
- محرك بحث
- فلتر مواد قانونية
- بيانات نموذجية
- إمكانية تحميل ملف CSV محليًا

## البنية الأساسية

```text
.
├── README.md
├── settings.gradle.kts
├── build.gradle.kts
├── app
│   ├── build.gradle.kts
│   └── src
│       └── main
│           ├── AndroidManifest.xml
│           ├── assets
│           │   ├── app.js
│           │   ├── styles.css
│           │   └── index.html
│           └── java/com/example/army36app
│               └── MainActivity.kt
└── gradle.properties
```

## تشغيل المشروع

1. افتح المستودع داخل Android Studio.
2. انتظر حتى تكتمل مزامنة Gradle.
3. اختر:
   - `Build > Build APK(s)`
4. ستتمكن من تثبيت التطبيق الناتج على الجهاز.

## ملاحظات مهمة

- التطبيق يعمل Offline من خلال `WebView` مستند إلى ملف HTML محلي.
- لا توجد أي تبعية خارجية للسحب من الإنترنت.
- تم استخدام CSV كصيغة تحميل محلية بدلاً من Excel بسبب تشغيل التطبيق Offline.

## المطور

- نائل الغزالي
- قسم استخبارات لواء 36
