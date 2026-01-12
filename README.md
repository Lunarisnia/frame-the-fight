<h1 align="center">|----- 🤛 Frame The Fight 🤜 -----|</h1>
<p align="center">Highly customizable instant overlay for your tournament.</p>

---

https://github.com/user-attachments/assets/b2780400-681b-454a-bbae-d5f7e03043d6

---
# How To Use


https://github.com/user-attachments/assets/528c24ad-e55b-4472-af0c-0f94e9f79d3f


1. Add a Browser source to your OBS
2. Open the newly added Browser source settings
3. Point the URL to `https://lounarisnia.com/frame-the-fight`
4. Set the width to 1920 (IMPORTANT)
5. Set the height to 1080 (IMPORTANT)
6. Download the control script from [Here](https://github.com/Lunarisnia/frame-the-fight/blob/main/scripts/frame-the-fight-script.lua)
7. Open the Script page on your OBS from Tools > Scripts
8. Add the control script
9. Choose the Browser source name that has just been added (If it does not exist just hit refresh on the script)
10. Enjoy (You can set hotkeys for controlling the scores and more on the OBS Hotkeys setting page)

# Customizing
All customization beside from moving component can be done inside the control script.
## Changing the Player Name, Team, Country and Scores
<img width="498" height="432" alt="image" src="https://github.com/user-attachments/assets/06363dbf-6ba2-4adb-a68d-a5bfe6a0dd14" />

You can also set hotkeys for the scores in the OBS Hotkey setting page
<img width="958" height="235" alt="image" src="https://github.com/user-attachments/assets/ea1018b7-a547-45db-a7ce-8e97bb035781" />

## Toggling certain component
If you want to hide certain component from being visible you can do so here on the Visibility group by scrolling down the control script
<img width="491" height="390" alt="image" src="https://github.com/user-attachments/assets/c66e53a2-e3c3-4d30-b162-05c0134cf4e9" />

This only hides the UI component but not the Text, if you want to do so then just put empty character as the entry.

## Changing the overlay design
You can also use your own custom design of the UI, if you need any template [Here](https://github.com/Lunarisnia/frame-the-fight/tree/main/public), PNG format are highly reccomended for the image
<img width="671" height="743" alt="image" src="https://github.com/user-attachments/assets/6120728d-a50f-4fa4-a7e5-a6ecd3cf2001" />

## Moving the components
You can use the interact feature on OBS to move the component by drag & dropping them. if you want to reset the position there is a "Reset Layout" button under the Group Stage customization on the control script.


https://github.com/user-attachments/assets/47b3cb16-449b-4ed4-b444-8a86f407503e



# Building the program
Clone the repo, navigate into it then run these commands.
```
1. npm install
2. npm run dev
```

# Contributing
You can contribute by reporting bugs in the issues pages, or even helping to maintain the project directly!. You can also contribute by simply starring this project, sharing it or [donate money to me](https://linktr.ee/lounarisnia).
