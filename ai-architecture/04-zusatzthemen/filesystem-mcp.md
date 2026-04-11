The File System Access API allows web apps to read or save changes directly to files and folders on the user's device.

![Pete LePage](https://web.dev/images/authors/petelepage.jpg) Pete LePage [X](https://twitter.com/petele) [GitHub](https://github.com/petele) [Mastodon](https://techhub.social/@petele) [Homepage](https://petelepage.com/) ![Thomas Steiner](https://web.dev/images/authors/thomassteiner.jpg) Thomas Steiner [GitHub](https://github.com/tomayac) [LinkedIn](https://www.linkedin.com/in/thomassteinerlinkedin) [Mastodon](https://toot.cafe/@tomayac) [Bluesky](https://bsky.app/profile/tomayac.com) [Homepage](https://blog.tomayac.com/)

  
 

Published: August 19, 2024

  
 

The [File System Access API](https://wicg.github.io/file-system-access/) enables developers to build powerful web apps that interact with  
files on the user's local device, such as IDEs, photo and video editors, text editors, and more. After  
a user grants a web app access, this API allows them to read or save changes directly to files and  
folders on the user's device. Beyond reading and writing files, the File System Access API provides  
the ability to open a directory and enumerate its contents.

> \[!NOTE\]  
> **Note:** The File System Access API---despite the similar name---is distinct from the [`FileSystem`](https://developer.mozilla.org/docs/Web/API/FileSystem) interface exposed by the [File and Directory Entries API](https://wicg.github.io/entries-api/#api-domfilesystem), which documents the types and operations made available by browsers to script when a hierarchy of files and directories are dragged and dropped onto a page or selected using form elements or equivalent user actions. It is likewise distinct from the deprecated [File API: Directories and System](https://www.w3.org/TR/file-system-api/) specification, which defines an API to navigate file system hierarchies and a means by which browsers may expose sandboxed sections of a user's local file system to web applications.

If you've worked with reading and writing files before, much of what I'm about to share will be  
familiar to you. I encourage you to read it anyway, because not all systems are alike.

> \[!NOTE\]  
> **Note:** We've put a lot of thought into the design and implementation of the File System Access API to ensure that people can manage their file system. See the [security and permissions](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access#security-considerations) section for more information.

The File System Access API is supported on most Chromium browsers on  
Windows, macOS, ChromeOS, Linux, and Android. A notable exception is Brave where it is  
[currently only available behind a flag](https://github.com/brave/brave-browser/issues/18979).

## Using the File System Access API

To show off the power and usefulness of the File System Access API, I wrote a single file [text](https://googlechromelabs.github.io/text-editor/)  
[editor](https://googlechromelabs.github.io/text-editor/). It lets you open a text file, edit it, save the changes back to disk, or start  
a new file and save the changes to disk. It's nothing fancy, but provides enough to help you  
understand the concepts.

### Browser support

Browser Support

*   !\[Chrome: 86.\](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='-10 -10 276 276'%3E%3ClinearGradient id='a' x1='145' x2='34' y1='253' y2='61' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231e8e3e'/%3E%3Cstop offset='1' stop-color='%2334a853'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='111' x2='222' y1='254' y2='62' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fcc934'/%3E%3Cstop offset='1' stop-color='%23fbbc04'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='17' x2='239' y1='80' y2='80' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23d93025'/%3E%3Cstop offset='1' stop-color='%23ea4335'/%3E%3C/linearGradient%3E%3Ccircle cx='128' cy='128' r='64' fill='%23fff'/%3E%3Cpath fill='url(%23a)' d='M96 183a64 64 0 0 1-23-23L17 64a128 128 0 0 0 111 192l55-96a64 64 0 0 1-87 23Z'/%3E%3Cpath fill='url(%23b)' d='M192 128a64 64 0 0 1-9 32l-55 96A128 128 0 0 0 239 64H128a64 64 0 0 1 64 64Z'/%3E%3Ccircle cx='128' cy='128' r='52' fill='%231a73e8'/%3E%3Cpath fill='url(%23c)' d='M96 73a64 64 0 0 1 32-9h111a128 128 0 0 0-222 0l56 96a64 64 0 0 1 23-87Z'/%3E%3C/svg%3E)
*   !\[Edge: 86.\](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 27600 27600'%3E%3ClinearGradient id='A' gradientUnits='userSpaceOnUse'/%3E%3ClinearGradient id='B' x1='6870' x2='24704' y1='18705' y2='18705' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%230c59a4'/%3E%3Cstop offset='1' stop-color='%23114a8b'/%3E%3C/linearGradient%3E%3ClinearGradient id='C' x1='16272' x2='5133' y1='10968' y2='23102' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%231b9de2'/%3E%3Cstop offset='.16' stop-color='%231595df'/%3E%3Cstop offset='.67' stop-color='%230680d7'/%3E%3Cstop offset='1' stop-color='%230078d4'/%3E%3C/linearGradient%3E%3CradialGradient id='D' cx='16720' cy='18747' r='9538' xlink:href='%23A'%3E%3Cstop offset='.72' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.53'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='E' cx='7130' cy='19866' r='14324' gradientTransform='matrix(.14843 -.98892 .79688 .1196 -8759 25542)' xlink:href='%23A'%3E%3Cstop offset='.76' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.5'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='F' cx='2523' cy='4680' r='20243' gradientTransform='matrix(-.03715 .99931 -2.12836 -.07913 13579 3530)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2335c1f1'/%3E%3Cstop offset='.11' stop-color='%2334c1ed'/%3E%3Cstop offset='.23' stop-color='%232fc2df'/%3E%3Cstop offset='.31' stop-color='%232bc3d2'/%3E%3Cstop offset='.67' stop-color='%2336c752'/%3E%3C/radialGradient%3E%3CradialGradient id='G' cx='24247' cy='7758' r='9734' gradientTransform='matrix(.28109 .95968 -.78353 .22949 24510 -16292)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2366eb6e'/%3E%3Cstop offset='1' stop-color='%2366eb6e' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cpath id='H' d='M24105 20053a9345 9345 0 01-1053 472 10202 10202 0 01-3590 646c-4732 0-8855-3255-8855-7432 0-1175 680-2193 1643-2729-4280 180-5380 4640-5380 7253 0 7387 6810 8137 8276 8137 791 0 1984-230 2704-456l130-44a12834 12834 0 006660-5282c220-350-168-757-535-565z'/%3E%3Cpath id='I' d='M11571 25141a7913 7913 0 01-2273-2137 8145 8145 0 01-1514-4740 8093 8093 0 013093-6395 8082 8082 0 011373-859c312-148 846-414 1554-404a3236 3236 0 012569 1297 3184 3184 0 01636 1866c0-21 2446-7960-8005-7960-4390 0-8004 4166-8004 7820 0 2319 538 4170 1212 5604a12833 12833 0 007684 6757 12795 12795 0 003908 610c1414 0 2774-233 4045-656a7575 7575 0 01-6278-803z'/%3E%3Cpath id='J' d='M16231 15886c-80 105-330 250-330 566 0 260 170 512 472 723 1438 1003 4149 868 4156 868a5954 5954 0 003027-839 6147 6147 0 001133-850 6180 6180 0 001910-4437c26-2242-796-3732-1133-4392-2120-4141-6694-6525-11668-6525-7011 0-12703 5635-12798 12620 47-3654 3679-6605 7996-6605 350 0 2346 34 4200 1007 1634 858 2490 1894 3086 2921 618 1067 728 2415 728 2952s-271 1333-780 1990z'/%3E%3Cuse fill='url(%23B)' xlink:href='%23H'/%3E%3Cuse fill='url(%23D)' opacity='.35' xlink:href='%23H'/%3E%3Cuse fill='url(%23C)' xlink:href='%23I'/%3E%3Cuse fill='url(%23E)' opacity='.4' xlink:href='%23I'/%3E%3Cuse fill='url(%23F)' xlink:href='%23J'/%3E%3Cuse fill='url(%23G)' xlink:href='%23J'/%3E%3C/svg%3E)
*   !\[Firefox: not supported.\](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'%3E%3Cdefs%3E%3CradialGradient id='ff-b' cx='428.5' cy='55.1' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23ffbd4f'/%3E%3Cstop offset='.2' stop-color='%23ffac31'/%3E%3Cstop offset='.3' stop-color='%23ff9d17'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff563b'/%3E%3Cstop offset='.5' stop-color='%23ff3750'/%3E%3Cstop offset='.7' stop-color='%23f5156c'/%3E%3Cstop offset='.8' stop-color='%23eb0878'/%3E%3Cstop offset='.9' stop-color='%23e50080'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-c' cx='245.4' cy='259.9' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%23960e18'/%3E%3Cstop offset='.3' stop-color='%23b11927' stop-opacity='.7'/%3E%3Cstop offset='.4' stop-color='%23db293d' stop-opacity='.3'/%3E%3Cstop offset='.5' stop-color='%23f5334b' stop-opacity='.1'/%3E%3Cstop offset='.5' stop-color='%23ff3750' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-d' cx='305.8' cy='-58.6' r='363' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.3' stop-color='%23ffdc3e'/%3E%3Cstop offset='.5' stop-color='%23ff9d12'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-e' cx='190' cy='390.8' r='238.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%233a8ee6'/%3E%3Cstop offset='.5' stop-color='%235c79f0'/%3E%3Cstop offset='.7' stop-color='%239059ff'/%3E%3Cstop offset='1' stop-color='%23c139e6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-f' cx='252.2' cy='201.3' r='126.5' gradientTransform='matrix(1 0 0 1 -48 31)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%239059ff' stop-opacity='0'/%3E%3Cstop offset='.3' stop-color='%238c4ff3' stop-opacity='.1'/%3E%3Cstop offset='.8' stop-color='%237716a8' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%236e008b' stop-opacity='.6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-g' cx='239.1' cy='34.6' r='171.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffe226'/%3E%3Cstop offset='.1' stop-color='%23ffdb27'/%3E%3Cstop offset='.3' stop-color='%23ffc82a'/%3E%3Cstop offset='.5' stop-color='%23ffa930'/%3E%3Cstop offset='.7' stop-color='%23ff7e37'/%3E%3Cstop offset='.8' stop-color='%23ff7139'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-h' cx='374' cy='-74.3' r='732.2' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-i' cx='304.6' cy='7.1' r='536.4' gradientTransform='rotate(84 303 4)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.6' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-j' cx='235' cy='98.1' r='457.1' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-k' cx='355.7' cy='124.9' r='500.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.2' stop-color='%23ffe141'/%3E%3Cstop offset='.5' stop-color='%23ffaf1e'/%3E%3Cstop offset='.6' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3ClinearGradient id='ff-a' x1='446.9' y1='76.8' x2='47.9' y2='461.8' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.4' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.5' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/linearGradient%3E%3ClinearGradient id='ff-l' x1='442.1' y1='74.8' x2='102.6' y2='414.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%23fff44f' stop-opacity='.8'/%3E%3Cstop offset='.3' stop-color='%23fff44f' stop-opacity='.6'/%3E%3Cstop offset='.5' stop-color='%23fff44f' stop-opacity='.2'/%3E%3Cstop offset='.6' stop-color='%23fff44f' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134a120 120 0 0 0-66 25 71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a229 229 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zM202 355l3 1-3-1zm55-145zm198-31z' fill='url(%23ff-a)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-b)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-c)'/%3E%3Cpath d='m362 195 1 1a130 130 0 0 0-22-29C266 92 322 5 331 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62z' fill='url(%23ff-d)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-e)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-f)'/%3E%3Cpath d='m171 151 5 3a111 111 0 0 1-1-58c-25 11-44 29-58 44 1 0 36 0 54 11z' fill='url(%23ff-g)'/%3E%3Cpath d='M18 261a242 242 0 0 0 231 197 207 207 0 0 0 206-279c8 56-20 110-64 146-86 71-169 43-186 31l-3-1c-50-24-71-70-67-110-42 0-57-35-57-35s38-28 89-4c46 22 90 4 90 4 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5l-5-3c-18-11-52-11-54-11-9-12-9-51-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73c0 1-9 38-5 57z' fill='url(%23ff-h)'/%3E%3Cpath d='M341 167a130 130 0 0 1 22 29 46 46 0 0 1 4 3c55 50 26 121 24 126 44-36 72-90 64-146-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-9 5-65 92 10 167z' fill='url(%23ff-i)'/%3E%3Cpath d='M367 199a46 46 0 0 0-4-3l-1-1c-13-9-36-18-58-15 86 44 63 193-57 187a107 107 0 0 1-31-6 131 131 0 0 1-11-5c17 12 99 39 186-31 2-5 31-76-24-126z' fill='url(%23ff-j)'/%3E%3Cpath d='M148 277s12-41 80-41c7 0 28-20 29-26s-44 18-90-4c-51-24-89 4-89 4s15 35 57 35c-4 40 16 85 67 110l3 1c-29-15-54-44-57-79z' fill='url(%23ff-k)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62-13-9-36-18-58-14 86 43 63 192-57 186a107 107 0 0 1-31-6 131 131 0 0 1-11-5l-3-1 3 1c-29-15-54-44-57-79 0 0 12-41 80-41 7 0 28-20 29-26 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a279 279 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zm-24 13z' fill='url(%23ff-l)'/%3E%3C/svg%3E)
*   !\[Safari: not supported.\](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='195 190 135 135'%3E%3Cdefs%3E%3ClinearGradient id='s-a' x1='132.6' x2='134.4' y1='111.7' y2='-105.3' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23d2d2d2' /%3E%3Cstop offset='.5' stop-color='%23f2f2f2' /%3E%3Cstop offset='1' stop-color='%23fff' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-b' gradientUnits='userSpaceOnUse' /%3E%3ClinearGradient id='s-c' x1='65.4' x2='67.4' y1='115.7' y2='17.1' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23005ad5' /%3E%3Cstop offset='.2' stop-color='%230875f0' /%3E%3Cstop offset='.3' stop-color='%23218cee' /%3E%3Cstop offset='.6' stop-color='%2327a5f3' /%3E%3Cstop offset='.8' stop-color='%2325aaf2' /%3E%3Cstop offset='1' stop-color='%2321aaef' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-d' x1='158.7' x2='176.3' y1='96.7' y2='79.5' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23c72e24' /%3E%3Cstop offset='1' stop-color='%23fd3b2f' /%3E%3C/linearGradient%3E%3CradialGradient id='s-i' cx='-69.9' cy='69.3' r='54' gradientTransform='matrix(.9 -.01 .04 2.72 -9 -120)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%2324a5f3' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%231e8ceb' /%3E%3C/radialGradient%3E%3CradialGradient id='s-j' cx='109.3' cy='13.8' r='93.1' gradientTransform='matrix(-.02 1.1 -1.04 -.02 137 -115)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235488d6' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235d96eb' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='220' height='220' x='22' y='-107' fill='url(%23s-a)' ry='49' transform='matrix(.57 0 0 .57 187 256)' /%3E%3Cg transform='translate(194 190)'%3E%3Ccircle cx='67.8' cy='67.7' fill='url(%23s-c)' paint-order='stroke fill markers' r='54' /%3E%3Ccircle cx='-69.9' cy='69.3' fill='url(%23s-i)' transform='translate(138 -2)' r='54' /%3E%3C/g%3E%3Cellipse cx='120' cy='14.2' fill='url(%23s-j)' rx='93.1' ry='93.7' transform='matrix(.58 0 0 .58 192 250)' /%3E%3Cg transform='matrix(.58 0 0 .57 197 182)'%3E%3Cpath fill='%23cac7c8' d='M46 192h1l72-48-7-9-66 57Z' /%3E%3Cpath fill='%23fbfffc' d='M46 191v1l66-57-7-9-59 65Z' /%3E%3Cpath fill='url(%23s-d)' d='m119 144-7-9 66-57-59 66Z' /%3E%3Cpath fill='%23fb645c' d='m105 126 7 9 66-57-1-1-72 49Z' /%3E%3C/g%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-miterlimit='1' stroke-width='1.3' d='m287 278 3-2m-12-17 8-2m-8-3h4m-4-13 8 2m-8 3h4m-1-13 7 3m-4-11 7 4m-2-11 6 6m0-12 6 7m1-11 4 6m4-10 3 7m5-9 2 7m15-7-1 7m10-5-3 7m11-4-4 7m11-2-5 6m16 7-7 4m10 4-7 3m10 6-8 1m8 16-8-2m5 10-7-3m4 11-7-4m2 11-6-5m0 11-5-6m-2 11-4-7m-4 11-3-8m-6 10-1-8m-16 8 2-8m-10 5 3-7m-11 4 4-7m-11 2 5-6m-8 3 3-3m4 8 2-3m5 8 2-4m6 7 1-4m8 5v-4m8 4v-4m9 3-1-4m9 1-2-4m9 0-2-4m9-2-3-3m8-4-3-2m8-5-4-2m7-6-4-1m5-8h-4m4-8h-4m3-9-4 1m1-9-4 2m-1-9-3 2m-2-9-3 3m-4-8-2 3m-5-8-2 4m-6-6-1 3m-8-5v4m-8-4v4m-9-2 1 3m-9 0 2 3m-9 1 2 3m-9 2 3 3m-8 4 3 2m-8 5 4 2m-7 6 4 1m-4 25 4-1m-2 5 7-3m-6 7 4-2m-2 6 7-4m-13-21h8m41-41v-8m0 99v-8m49-42h-8' transform='translate(-65 8)' /%3E%3C/svg%3E)

[Source](https://developer.mozilla.org/docs/Web/API/Window/showOpenFilePicker)

  
 

### Feature detection

To find out if the File System Access API is supported, check if the picker method  
you're interested in exists.

```
if ('showOpenFilePicker' in self) {
  // The `showOpenFilePicker()` method of the File System Access API is supported.
}
```

### Try it

See the File System Access API in action in the  
[text editor](https://googlechromelabs.github.io/text-editor/) demo.

### Read a file from the local file system

The first use case I want to tackle is to ask the user to choose a file, then open and read that  
file from disk.

#### Ask the user to pick a file to read

The entry point to the File System Access API is  
[`window.showOpenFilePicker()`](https://wicg.github.io/file-system-access/#api-showopenfilepicker). When called, it shows a file picker dialog,  
and prompts the user to select a file. After they select a file, the API returns an array of file  
handles. An optional `options` parameter lets you influence the behavior of the file picker, for  
example, by allowing the user to select multiple files, or directories, or different file types.  
Without any options specified, the file picker allows the user to select a single file. This is  
perfect for a text editor.

Like many other powerful APIs, calling `showOpenFilePicker()` must be done in a [secure](https://w3c.github.io/webappsec-secure-contexts/)  
[context](https://w3c.github.io/webappsec-secure-contexts/), and must be called from within a user gesture.

```
let fileHandle;
butOpenFile.addEventListener('click', async () => {
  // Destructure the one-element array.
  [fileHandle] = await window.showOpenFilePicker();
  // Do something with the file handle.
});
```

Once the user selects a file, `showOpenFilePicker()` returns an array of handles, in this case a  
one-element array with one [`FileSystemFileHandle`](https://wicg.github.io/file-system-access/#api-filesystemfilehandle) that contains the properties and  
methods needed to interact with the file.

It's helpful to keep a reference to the file handle so that it can be used later. It'll be  
needed to save changes to the file, or to perform any other file operations.

#### Read a file from the file system

Now that you have a handle to a file, you can get the file's properties, or access the file itself.  
For now, I'll read its contents. Calling `handle.getFile()` returns a [`File`](https://w3c.github.io/FileAPI/)  
object, which contains a blob. To get the data from the blob, call one of [its](https://developer.mozilla.org/docs/Web/API/Blob)  
[methods](https://developer.mozilla.org/docs/Web/API/Blob), ([`slice()`](https://developer.mozilla.org/docs/Web/API/Blob/slice),  
[`stream()`](https://developer.mozilla.org/docs/Web/API/Blob/stream),  
[`text()`](https://developer.mozilla.org/docs/Web/API/Blob/text), or  
[`arrayBuffer()`](https://developer.mozilla.org/docs/Web/API/Blob/arrayBuffer)).

```
const file = await fileHandle.getFile();
const contents = await file.text();
```

> \[!NOTE\]  
> **Note:** For the majority of use cases, you can read files in _sequential_ order with the `stream()`, `text()`, or `arrayBuffer()` methods. For getting _random access_ to a file's contents, use the `slice()` method.

The `File` object returned by `FileSystemFileHandle.getFile()` is only readable as long as the  
underlying file on disk hasn't changed. If the file on disk is modified, the `File` object becomes  
unreadable and you'll need to call `getFile()` again to get a new `File` object to read the changed  
data.

#### Putting it all together

When users click the **Open** button, the browser shows a file picker. Once they've selected a file, the  
app reads the contents and puts them into a `<textarea>`.

```
let fileHandle;
butOpenFile.addEventListener('click', async () => {
  [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  textArea.value = contents;
});
```

### Write the file to the local file system

In the text editor, there are two ways to save a file: **Save** , and **Save As** . **Save**  
writes the changes back to the original file using the file handle retrieved earlier. But **Save**  
**As** creates a new file, and thus requires a new file handle.

#### Create a new file

To save a file, call [`showSaveFilePicker()`](https://wicg.github.io/file-system-access/#api-showsavefilepicker), which shows the file picker  
in "save" mode, allowing the user to pick a new file they want to use for saving. For the text  
editor, I also wanted it to automatically add a `.txt` extension, so I provided some additional  
parameters.

```
async function getNewFileHandle() {
  const options = {
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt'],
        },
      },
    ],
  };
  const handle = await window.showSaveFilePicker(options);
  return handle;
}
```

> \[!IMPORTANT\]  
> **Key point:** Sometimes processing the to-be-saved data takes some time after the user clicks the **Save** button in your app. A common gotcha is to do this work _before_ the `showSaveFilePicker()` code has run, resulting in a `SecurityError Failed to execute 'showSaveFilePicker' on 'Window': Must be handling a user gesture to show a file picker.`. Instead, get the file handle first, and only _after_ obtaining the file handle start processing the data.

#### Save changes to disk

You can find all the code for saving changes to a file in my [text editor](https://googlechromelabs.github.io/text-editor/) demo on  
[GitHub](https://github.com/GoogleChromeLabs/text-editor/). The core file system interactions are in  
[`fs-helpers.js`](https://github.com/GoogleChromeLabs/text-editor/blob/main/src/inline-scripts/fs-helpers.js). At its simplest, the process looks like the following code.  
I'll walk through each step and explain it.

```
// fileHandle is an instance of FileSystemFileHandle..
async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(contents);
  // Close the file and write the contents to disk.
  await writable.close();
}
```

Writing data to disk uses a [`FileSystemWritableFileStream`](https://wicg.github.io/file-system-access/#api-filesystemwritablefilestream) object, a subclass  
of [`WritableStream`](https://developer.mozilla.org/docs/Web/API/WritableStream). Create the stream by calling `createWritable()` on the file  
handle object. When `createWritable()` is called, the browser first checks if the user has granted  
write permission to the file. If permission to write hasn't been granted, the browser prompts  
the user for permission. If permission isn't granted, `createWritable()` throws a  
`DOMException`, and the app won't be able to write to the file. In the text editor, the  
`DOMException` objects are handled in the [`saveFile()`](https://github.com/GoogleChromeLabs/text-editor/blob/main/src/inline-scripts/app.js) method.

The `write()` method takes a string, which is what's needed for a text editor. But it can also take  
a [BufferSource](https://developer.mozilla.org/docs/Web/API/BufferSource), or a [Blob](https://developer.mozilla.org/docs/Web/API/Blob). For example, you can pipe a stream directly to  
it:

```
async function writeURLToFile(fileHandle, url) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Make an HTTP request for the contents.
  const response = await fetch(url);
  // Stream the response into the file.
  await response.body.pipeTo(writable);
  // pipeTo() closes the destination pipe by default, no need to close it.
}
```

You can also [`seek()`](https://wicg.github.io/file-system-access/#api-filesystemwritablefilestream-seek), or [`truncate()`](https://wicg.github.io/file-system-access/#api-filesystemwritablefilestream-truncate) within the stream to update the  
file at a specific position, or resize the file.

> \[!CAUTION\]  
> **Caution:** Changes are **not** written to disk until the stream is closed, either by calling `close()` or when the stream is automatically closed by the pipe.

### Specifying a suggested filename and start directory

In many cases you may want your app to suggest a default filename or location. For example, a text  
editor might want to suggest a default filename of `Untitled Text.txt` rather than `Untitled`. You  
can achieve this by passing a `suggestedName` property as part of the `showSaveFilePicker` options.

```
const fileHandle = await self.showSaveFilePicker({
  suggestedName: 'Untitled Text.txt',
  types: [{
    description: 'Text documents',
    accept: {
      'text/plain': ['.txt'],
    },
  }],
});
```

The same goes for the default start directory. If you're building a text editor, you may want to  
start the file save or file open dialog in the default `documents` folder, whereas for an image  
editor, may want to start in the default `pictures` folder. You can suggest a default start  
directory by passing a `startIn` property to the `showSaveFilePicker`, `showDirectoryPicker()`, or  
`showOpenFilePicker` methods like so.

```
const fileHandle = await self.showOpenFilePicker({
  startIn: 'pictures'
});
```

The list of the well-known system directories is:

*   `desktop`: The user's desktop directory, if such a thing exists.
*   `documents`: Directory in which documents created by the user would typically be stored.
*   `downloads`: Directory where downloaded files would typically be stored.
*   `music`: Directory where audio files would typically be stored.
*   `pictures`: Directory where photos and other still images would typically be stored.
*   `videos`: Directory where videos or movies would typically be stored.

Apart from well-known system directories, you can also pass an existing file or directory handle as  
a value for `startIn`. The dialog would then open in the same directory.

```
// Assume `directoryHandle` is a handle to a previously opened directory.
const fileHandle = await self.showOpenFilePicker({
  startIn: directoryHandle
});
```

### Specifying the purpose of different file pickers

Sometimes applications have different pickers for different purposes. For example, a rich text  
editor may allow the user to open text files, but also to import images. By default, each file  
picker would open at the last-remembered location. You can circumvent this by storing `id` values  
for each type of picker. If an `id` is specified, the file picker implementation remembers a  
separate last-used directory for that `id`.

```
const fileHandle1 = await self.showSaveFilePicker({
  id: 'openText',
});

const fileHandle2 = await self.showSaveFilePicker({
  id: 'importImage',
});
```

### Storing file handles or directory handles in IndexedDB

File handles and directory handles are serializable, which means that you can save a file or  
directory handle to IndexedDB, or call `postMessage()` to send them between the same top-level  
origin.

Saving file or directory handles to IndexedDB means that you can store state, or remember which  
files or directories a user was working on. This makes it possible to keep a list of recently opened  
or edited files, offer to re-open the last file when the app is opened, restore the previous working  
directory, and more. In the text editor, I store a list of the five most recent files the user has  
opened, making it possible to access those files again.

The following code example shows storing and retrieving a file handle and a directory handle. You can  
[see this in action](https://filehandle-directoryhandle-indexeddb.glitch.me/) over on Glitch. (I use  
the [idb-keyval](https://www.npmjs.com/package/idb-keyval) library for brevity.)

```
import { get, set } from 'https://unpkg.com/idb-keyval@5.0.2/dist/esm/index.js';

const pre1 = document.querySelector('pre.file');
const pre2 = document.querySelector('pre.directory');
const button1 = document.querySelector('button.file');
const button2 = document.querySelector('button.directory');

// File handle
button1.addEventListener('click', async () => {
  try {
    const fileHandleOrUndefined = await get('file');
    if (fileHandleOrUndefined) {
      pre1.textContent = `Retrieved file handle "${fileHandleOrUndefined.name}" from IndexedDB.`;
      return;
    }
    const [fileHandle] = await window.showOpenFilePicker();
    await set('file', fileHandle);
    pre1.textContent = `Stored file handle for "${fileHandle.name}" in IndexedDB.`;
  } catch (error) {
    alert(error.name, error.message);
  }
});

// Directory handle
button2.addEventListener('click', async () => {
  try {
    const directoryHandleOrUndefined = await get('directory');
    if (directoryHandleOrUndefined) {
      pre2.textContent = `Retrieved directroy handle "${directoryHandleOrUndefined.name}" from IndexedDB.`;
      return;
    }
    const directoryHandle = await window.showDirectoryPicker();
    await set('directory', directoryHandle);
    pre2.textContent = `Stored directory handle for "${directoryHandle.name}" in IndexedDB.`;
  } catch (error) {
    alert(error.name, error.message);
  }
});
```

### Stored file or directory handles and permissions

Since [permissions are not always persisted between sessions](https://developer.chrome.com/blog/persistent-permissions-for-the-file-system-access-api), you should verify whether the user  
has granted permission to the file or directory using `queryPermission()`. If they haven't, call  
`requestPermission()` to (re-)request it. This works the same for file and directory handles. You  
need to run `fileOrDirectoryHandle.requestPermission(descriptor)` or  
`fileOrDirectoryHandle.queryPermission(descriptor)` respectively.

In the text editor, I created a `verifyPermission()` method that checks if the user has already  
granted permission, and if required, makes the request.

```
async function verifyPermission(fileHandle, readWrite) {
  const options = {};
  if (readWrite) {
    options.mode = 'readwrite';
  }
  // Check if permission was already granted. If so, return true.
  if ((await fileHandle.queryPermission(options)) === 'granted') {
    return true;
  }
  // Request permission. If the user grants permission, return true.
  if ((await fileHandle.requestPermission(options)) === 'granted') {
    return true;
  }
  // The user didn't grant permission, so return false.
  return false;
}
```

By requesting write permission with the read request, I reduced the number of permission prompts;  
the user sees one prompt when opening the file, and grants permission to both read and write to it.

### Opening a directory and enumerating its contents

To enumerate all files in a directory, call [`showDirectoryPicker()`](https://wicg.github.io/file-system-access/#api-showdirectorypicker). The user  
selects a directory in a picker, after which a [`FileSystemDirectoryHandle`](https://wicg.github.io/file-system-access/#api-filesystemdirectoryhandle) is  
returned, which lets you enumerate and access the directory's files. By default, you will have read  
access to the files in the directory, but if you need write access, you can pass  
`{ mode: 'readwrite' }` to the method.

```
butDir.addEventListener('click', async () => {
  const dirHandle = await window.showDirectoryPicker();
  for await (const entry of dirHandle.values()) {
    console.log(entry.kind, entry.name);
  }
});
```

If you additionally need to access each file using `getFile()` to, for example, obtain the individual  
file sizes, don't use `await` on each result sequentially, but rather process all files in  
parallel, for example, using `Promise.all()`.

```
butDir.addEventListener('click', async () => {
  const dirHandle = await window.showDirectoryPicker();
  const promises = [];
  for await (const entry of dirHandle.values()) {
    if (entry.kind !== 'file') {
      continue;
    }
    promises.push(entry.getFile().then((file) => `${file.name} (${file.size})`));
  }
  console.log(await Promise.all(promises));
});
```

### Creating or accessing files and folders in a directory

From a directory, you can create or access files and folders using the  
[`getFileHandle()`](https://wicg.github.io/file-system-access/#dom-filesystemdirectoryhandle-getfilehandle) or respectively the [`getDirectoryHandle()`](https://wicg.github.io/file-system-access/#dom-filesystemdirectoryhandle-getdirectoryhandle)  
method. By passing in an optional `options` object with a key of `create` and a boolean value of  
`true` or `false`, you can determine if a new file or folder should be created if it doesn't exist.

```
// In an existing directory, create a new directory named "My Documents".
const newDirectoryHandle = await existingDirectoryHandle.getDirectoryHandle('My Documents', {
  create: true,
});
// In this new directory, create a file named "My Notes.txt".
const newFileHandle = await newDirectoryHandle.getFileHandle('My Notes.txt', { create: true });
```

### Resolving the path of an item in a directory

When working with files or folders in a directory, it can be useful to resolve the path of the item  
in question. This can be done with the aptly named [`resolve()`](https://wicg.github.io/file-system-access/#api-filesystemdirectoryhandle-resolve) method. For resolving, the  
item can be a direct or indirect child of the directory.

```
// Resolve the path of the previously created file called "My Notes.txt".
const path = await newDirectoryHandle.resolve(newFileHandle);
// `path` is now ["My Documents", "My Notes.txt"]
```

### Deleting files and folders in a directory

If you have obtained access to a directory, you can delete the contained files and folders with the  
[`removeEntry()`](https://wicg.github.io/file-system-access/#dom-filesystemdirectoryhandle-removeentry) method. For folders, deletion can optionally be recursive and include  
all subfolders and the files contained therein.

```
// Delete a file.
await directoryHandle.removeEntry('Abandoned Projects.txt');
// Recursively delete a folder.
await directoryHandle.removeEntry('Old Stuff', { recursive: true });
```

### Deleting a file or folder directly

If you have access to a file or directory handle, call `remove()` on a `FileSystemFileHandle` or  
`FileSystemDirectoryHandle` to remove it.

```
// Delete a file.
await fileHandle.remove();
// Delete a directory.
await directoryHandle.remove();
```

### Renaming and moving files and folders

Files and folders can be renamed or moved to a new location by calling `move()` on the  
`FileSystemHandle` interface. `FileSystemHandle` has the child interfaces `FileSystemFileHandle` and  
`FileSystemDirectoryHandle`. The `move()` method takes one or two parameters. The first can either  
be a string with the new name or a `FileSystemDirectoryHandle` to the destination folder. In the  
latter case, the optional second parameter is a string with the new name, so moving and renaming can  
happen in one step.

```
// Rename the file.
await file.move('new_name');
// Move the file to a new directory.
await file.move(directory);
// Move the file to a new directory and rename it.
await file.move(directory, 'newer_name');
```

> \[!NOTE\]  
> **Note:** The `FileSystemHandle.move()` method has shipped for files within the origin private file system (OPFS), is behind a flag for files if the source or destination is outside of the OPFS, and is not [yet](https://crbug.com/1250534) supported for directories.

### Drag and drop integration

The  
[HTML Drag and Drop interfaces](https://developer.mozilla.org/docs/Web/API/HTML_Drag_and_Drop_API)  
enable web applications to accept  
[dragged and dropped files](https://developer.mozilla.org/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop)  
on a web page. During a drag and drop operation, dragged file and directory items are associated  
with file entries and directory entries respectively. The `DataTransferItem.getAsFileSystemHandle()`  
method returns a promise with a `FileSystemFileHandle` object if the dragged item is a file, and a  
promise with a `FileSystemDirectoryHandle` object if the dragged item is a directory. The following listing  
shows this in action. Note that the Drag and Drop interface's  
[`DataTransferItem.kind`](https://developer.mozilla.org/docs/Web/API/DataTransferItem/kind) is  
`"file"` for both files _and_ directories, whereas [`FileSystemHandle.kind`](https://wicg.github.io/file-system-access/#dom-filesystemhandle-kind) of the File System Access API is  
`"file"` for files and `"directory"` for directories.

```
elem.addEventListener('dragover', (e) => {
  // Prevent navigation.
  e.preventDefault();
});

elem.addEventListener('drop', async (e) => {
  e.preventDefault();

  const fileHandlesPromises = [...e.dataTransfer.items]
    .filter((item) => item.kind === 'file')
    .map((item) => item.getAsFileSystemHandle());

  for await (const handle of fileHandlesPromises) {
    if (handle.kind === 'directory') {
      console.log(`Directory: ${handle.name}`);
    } else {
      console.log(`File: ${handle.name}`);
    }
  }
});
```

### Accessing the origin private file system

The origin private file system is a storage endpoint that, as the name suggests, is private to the  
origin of the page. While browsers typically implement this by persisting the contents of this  
origin private file system to disk somewhere, it is _not_ intended that the contents be user  
accessible. Similarly, there is _no_ expectation that files or directories with names matching the  
names of children of the origin private file system exist. While the browser might make it seem that  
there are files, internally---since this is an origin private file system---the browser might store  
these "files" in a database or any other data structure. Essentially, if you use this API,  
do _not_ expect to find the created files matched one-to-one somewhere on the hard disk. You can operate as usual on  
the origin private file system once you have access to the root `FileSystemDirectoryHandle`.

```
const root = await navigator.storage.getDirectory();
// Create a new file handle.
const fileHandle = await root.getFileHandle('Untitled.txt', { create: true });
// Create a new directory handle.
const dirHandle = await root.getDirectoryHandle('New Folder', { create: true });
// Recursively remove a directory.
await root.removeEntry('Old Stuff', { recursive: true });
```

Browser Support

*   !\[Chrome: 86.\](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='-10 -10 276 276'%3E%3ClinearGradient id='a' x1='145' x2='34' y1='253' y2='61' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%231e8e3e'/%3E%3Cstop offset='1' stop-color='%2334a853'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='111' x2='222' y1='254' y2='62' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fcc934'/%3E%3Cstop offset='1' stop-color='%23fbbc04'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='17' x2='239' y1='80' y2='80' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23d93025'/%3E%3Cstop offset='1' stop-color='%23ea4335'/%3E%3C/linearGradient%3E%3Ccircle cx='128' cy='128' r='64' fill='%23fff'/%3E%3Cpath fill='url(%23a)' d='M96 183a64 64 0 0 1-23-23L17 64a128 128 0 0 0 111 192l55-96a64 64 0 0 1-87 23Z'/%3E%3Cpath fill='url(%23b)' d='M192 128a64 64 0 0 1-9 32l-55 96A128 128 0 0 0 239 64H128a64 64 0 0 1 64 64Z'/%3E%3Ccircle cx='128' cy='128' r='52' fill='%231a73e8'/%3E%3Cpath fill='url(%23c)' d='M96 73a64 64 0 0 1 32-9h111a128 128 0 0 0-222 0l56 96a64 64 0 0 1 23-87Z'/%3E%3C/svg%3E)
*   !\[Edge: 86.\](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='0 0 27600 27600'%3E%3ClinearGradient id='A' gradientUnits='userSpaceOnUse'/%3E%3ClinearGradient id='B' x1='6870' x2='24704' y1='18705' y2='18705' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%230c59a4'/%3E%3Cstop offset='1' stop-color='%23114a8b'/%3E%3C/linearGradient%3E%3ClinearGradient id='C' x1='16272' x2='5133' y1='10968' y2='23102' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%231b9de2'/%3E%3Cstop offset='.16' stop-color='%231595df'/%3E%3Cstop offset='.67' stop-color='%230680d7'/%3E%3Cstop offset='1' stop-color='%230078d4'/%3E%3C/linearGradient%3E%3CradialGradient id='D' cx='16720' cy='18747' r='9538' xlink:href='%23A'%3E%3Cstop offset='.72' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.53'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='E' cx='7130' cy='19866' r='14324' gradientTransform='matrix(.14843 -.98892 .79688 .1196 -8759 25542)' xlink:href='%23A'%3E%3Cstop offset='.76' stop-opacity='0'/%3E%3Cstop offset='.95' stop-opacity='.5'/%3E%3Cstop offset='1'/%3E%3C/radialGradient%3E%3CradialGradient id='F' cx='2523' cy='4680' r='20243' gradientTransform='matrix(-.03715 .99931 -2.12836 -.07913 13579 3530)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2335c1f1'/%3E%3Cstop offset='.11' stop-color='%2334c1ed'/%3E%3Cstop offset='.23' stop-color='%232fc2df'/%3E%3Cstop offset='.31' stop-color='%232bc3d2'/%3E%3Cstop offset='.67' stop-color='%2336c752'/%3E%3C/radialGradient%3E%3CradialGradient id='G' cx='24247' cy='7758' r='9734' gradientTransform='matrix(.28109 .95968 -.78353 .22949 24510 -16292)' xlink:href='%23A'%3E%3Cstop offset='0' stop-color='%2366eb6e'/%3E%3Cstop offset='1' stop-color='%2366eb6e' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cpath id='H' d='M24105 20053a9345 9345 0 01-1053 472 10202 10202 0 01-3590 646c-4732 0-8855-3255-8855-7432 0-1175 680-2193 1643-2729-4280 180-5380 4640-5380 7253 0 7387 6810 8137 8276 8137 791 0 1984-230 2704-456l130-44a12834 12834 0 006660-5282c220-350-168-757-535-565z'/%3E%3Cpath id='I' d='M11571 25141a7913 7913 0 01-2273-2137 8145 8145 0 01-1514-4740 8093 8093 0 013093-6395 8082 8082 0 011373-859c312-148 846-414 1554-404a3236 3236 0 012569 1297 3184 3184 0 01636 1866c0-21 2446-7960-8005-7960-4390 0-8004 4166-8004 7820 0 2319 538 4170 1212 5604a12833 12833 0 007684 6757 12795 12795 0 003908 610c1414 0 2774-233 4045-656a7575 7575 0 01-6278-803z'/%3E%3Cpath id='J' d='M16231 15886c-80 105-330 250-330 566 0 260 170 512 472 723 1438 1003 4149 868 4156 868a5954 5954 0 003027-839 6147 6147 0 001133-850 6180 6180 0 001910-4437c26-2242-796-3732-1133-4392-2120-4141-6694-6525-11668-6525-7011 0-12703 5635-12798 12620 47-3654 3679-6605 7996-6605 350 0 2346 34 4200 1007 1634 858 2490 1894 3086 2921 618 1067 728 2415 728 2952s-271 1333-780 1990z'/%3E%3Cuse fill='url(%23B)' xlink:href='%23H'/%3E%3Cuse fill='url(%23D)' opacity='.35' xlink:href='%23H'/%3E%3Cuse fill='url(%23C)' xlink:href='%23I'/%3E%3Cuse fill='url(%23E)' opacity='.4' xlink:href='%23I'/%3E%3Cuse fill='url(%23F)' xlink:href='%23J'/%3E%3Cuse fill='url(%23G)' xlink:href='%23J'/%3E%3C/svg%3E)
*   !\[Firefox: 111.\](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 512 512'%3E%3Cdefs%3E%3CradialGradient id='ff-b' cx='428.5' cy='55.1' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23ffbd4f'/%3E%3Cstop offset='.2' stop-color='%23ffac31'/%3E%3Cstop offset='.3' stop-color='%23ff9d17'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff563b'/%3E%3Cstop offset='.5' stop-color='%23ff3750'/%3E%3Cstop offset='.7' stop-color='%23f5156c'/%3E%3Cstop offset='.8' stop-color='%23eb0878'/%3E%3Cstop offset='.9' stop-color='%23e50080'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-c' cx='245.4' cy='259.9' r='501' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%23960e18'/%3E%3Cstop offset='.3' stop-color='%23b11927' stop-opacity='.7'/%3E%3Cstop offset='.4' stop-color='%23db293d' stop-opacity='.3'/%3E%3Cstop offset='.5' stop-color='%23f5334b' stop-opacity='.1'/%3E%3Cstop offset='.5' stop-color='%23ff3750' stop-opacity='0'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-d' cx='305.8' cy='-58.6' r='363' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.3' stop-color='%23ffdc3e'/%3E%3Cstop offset='.5' stop-color='%23ff9d12'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-e' cx='190' cy='390.8' r='238.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.3' stop-color='%233a8ee6'/%3E%3Cstop offset='.5' stop-color='%235c79f0'/%3E%3Cstop offset='.7' stop-color='%239059ff'/%3E%3Cstop offset='1' stop-color='%23c139e6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-f' cx='252.2' cy='201.3' r='126.5' gradientTransform='matrix(1 0 0 1 -48 31)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%239059ff' stop-opacity='0'/%3E%3Cstop offset='.3' stop-color='%238c4ff3' stop-opacity='.1'/%3E%3Cstop offset='.8' stop-color='%237716a8' stop-opacity='.5'/%3E%3Cstop offset='1' stop-color='%236e008b' stop-opacity='.6'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-g' cx='239.1' cy='34.6' r='171.6' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffe226'/%3E%3Cstop offset='.1' stop-color='%23ffdb27'/%3E%3Cstop offset='.3' stop-color='%23ffc82a'/%3E%3Cstop offset='.5' stop-color='%23ffa930'/%3E%3Cstop offset='.7' stop-color='%23ff7e37'/%3E%3Cstop offset='.8' stop-color='%23ff7139'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-h' cx='374' cy='-74.3' r='732.2' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-i' cx='304.6' cy='7.1' r='536.4' gradientTransform='rotate(84 303 4)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.3' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.6' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-j' cx='235' cy='98.1' r='457.1' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.5' stop-color='%23ff980e'/%3E%3Cstop offset='.6' stop-color='%23ff5634'/%3E%3Cstop offset='.7' stop-color='%23ff3647'/%3E%3Cstop offset='.9' stop-color='%23e31587'/%3E%3C/radialGradient%3E%3CradialGradient id='ff-k' cx='355.7' cy='124.9' r='500.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.2' stop-color='%23ffe141'/%3E%3Cstop offset='.5' stop-color='%23ffaf1e'/%3E%3Cstop offset='.6' stop-color='%23ff980e'/%3E%3C/radialGradient%3E%3ClinearGradient id='ff-a' x1='446.9' y1='76.8' x2='47.9' y2='461.8' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.1' stop-color='%23fff44f'/%3E%3Cstop offset='.1' stop-color='%23ffe847'/%3E%3Cstop offset='.2' stop-color='%23ffc830'/%3E%3Cstop offset='.4' stop-color='%23ff980e'/%3E%3Cstop offset='.4' stop-color='%23ff8b16'/%3E%3Cstop offset='.5' stop-color='%23ff672a'/%3E%3Cstop offset='.5' stop-color='%23ff3647'/%3E%3Cstop offset='.7' stop-color='%23e31587'/%3E%3C/linearGradient%3E%3ClinearGradient id='ff-l' x1='442.1' y1='74.8' x2='102.6' y2='414.3' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='.2' stop-color='%23fff44f' stop-opacity='.8'/%3E%3Cstop offset='.3' stop-color='%23fff44f' stop-opacity='.6'/%3E%3Cstop offset='.5' stop-color='%23fff44f' stop-opacity='.2'/%3E%3Cstop offset='.6' stop-color='%23fff44f' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134a120 120 0 0 0-66 25 71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a229 229 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zM202 355l3 1-3-1zm55-145zm198-31z' fill='url(%23ff-a)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-b)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60 14 26 22 53 25 72v1a207 207 0 0 1-206 279c-113-3-212-87-231-197-3-17 0-26 2-40-2 11-3 14-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121z' fill='url(%23ff-c)'/%3E%3Cpath d='m362 195 1 1a130 130 0 0 0-22-29C266 92 322 5 331 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62z' fill='url(%23ff-d)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-e)'/%3E%3Cpath d='M257 210c-1 6-22 26-29 26-68 0-80 41-80 41 3 35 28 64 57 79l4 2 7 3a107 107 0 0 0 31 6c120 6 143-143 57-186 22-4 45 5 58 14-21-37-60-62-105-62l-9 1a120 120 0 0 0-66 25l17 16c16 16 58 33 58 35z' fill='url(%23ff-f)'/%3E%3Cpath d='m171 151 5 3a111 111 0 0 1-1-58c-25 11-44 29-58 44 1 0 36 0 54 11z' fill='url(%23ff-g)'/%3E%3Cpath d='M18 261a242 242 0 0 0 231 197 207 207 0 0 0 206-279c8 56-20 110-64 146-86 71-169 43-186 31l-3-1c-50-24-71-70-67-110-42 0-57-35-57-35s38-28 89-4c46 22 90 4 90 4 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5l-5-3c-18-11-52-11-54-11-9-12-9-51-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73c0 1-9 38-5 57z' fill='url(%23ff-h)'/%3E%3Cpath d='M341 167a130 130 0 0 1 22 29 46 46 0 0 1 4 3c55 50 26 121 24 126 44-36 72-90 64-146-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-9 5-65 92 10 167z' fill='url(%23ff-i)'/%3E%3Cpath d='M367 199a46 46 0 0 0-4-3l-1-1c-13-9-36-18-58-15 86 44 63 193-57 187a107 107 0 0 1-31-6 131 131 0 0 1-11-5c17 12 99 39 186-31 2-5 31-76-24-126z' fill='url(%23ff-j)'/%3E%3Cpath d='M148 277s12-41 80-41c7 0 28-20 29-26s-44 18-90-4c-51-24-89 4-89 4s15 35 57 35c-4 40 16 85 67 110l3 1c-29-15-54-44-57-79z' fill='url(%23ff-k)'/%3E%3Cpath d='M479 166c-11-25-32-52-49-60a249 249 0 0 1 25 73c-27-68-73-95-111-155a255 255 0 0 1-8-14 44 44 0 0 1-4-9 1 1 0 0 0 0-1 1 1 0 0 0-1 0c-60 35-81 101-83 134l9-1c45 0 84 25 105 62-13-9-36-18-58-14 86 43 63 192-57 186a107 107 0 0 1-31-6 131 131 0 0 1-11-5l-3-1 3 1c-29-15-54-44-57-79 0 0 12-41 80-41 7 0 28-20 29-26 0-2-42-19-58-35l-17-16a71 71 0 0 0-6-5 111 111 0 0 1-1-58c-25 11-44 29-58 44-9-12-9-52-8-60l-8 4a175 175 0 0 0-24 21 210 210 0 0 0-22 26 203 203 0 0 0-32 73l-1 2-2 15a279 279 0 0 0-4 34v1a240 240 0 0 0 477 40l1-9c5-41 0-84-15-121zm-24 13z' fill='url(%23ff-l)'/%3E%3C/svg%3E)
*   !\[Safari: 15.2.\](data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24' viewBox='195 190 135 135'%3E%3Cdefs%3E%3ClinearGradient id='s-a' x1='132.6' x2='134.4' y1='111.7' y2='-105.3' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23d2d2d2' /%3E%3Cstop offset='.5' stop-color='%23f2f2f2' /%3E%3Cstop offset='1' stop-color='%23fff' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-b' gradientUnits='userSpaceOnUse' /%3E%3ClinearGradient id='s-c' x1='65.4' x2='67.4' y1='115.7' y2='17.1' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23005ad5' /%3E%3Cstop offset='.2' stop-color='%230875f0' /%3E%3Cstop offset='.3' stop-color='%23218cee' /%3E%3Cstop offset='.6' stop-color='%2327a5f3' /%3E%3Cstop offset='.8' stop-color='%2325aaf2' /%3E%3Cstop offset='1' stop-color='%2321aaef' /%3E%3C/linearGradient%3E%3ClinearGradient id='s-d' x1='158.7' x2='176.3' y1='96.7' y2='79.5' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%23c72e24' /%3E%3Cstop offset='1' stop-color='%23fd3b2f' /%3E%3C/linearGradient%3E%3CradialGradient id='s-i' cx='-69.9' cy='69.3' r='54' gradientTransform='matrix(.9 -.01 .04 2.72 -9 -120)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-color='%2324a5f3' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%231e8ceb' /%3E%3C/radialGradient%3E%3CradialGradient id='s-j' cx='109.3' cy='13.8' r='93.1' gradientTransform='matrix(-.02 1.1 -1.04 -.02 137 -115)' xlink:href='%23s-b'%3E%3Cstop offset='0' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235488d6' stop-opacity='0' /%3E%3Cstop offset='1' stop-color='%235d96eb' /%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='220' height='220' x='22' y='-107' fill='url(%23s-a)' ry='49' transform='matrix(.57 0 0 .57 187 256)' /%3E%3Cg transform='translate(194 190)'%3E%3Ccircle cx='67.8' cy='67.7' fill='url(%23s-c)' paint-order='stroke fill markers' r='54' /%3E%3Ccircle cx='-69.9' cy='69.3' fill='url(%23s-i)' transform='translate(138 -2)' r='54' /%3E%3C/g%3E%3Cellipse cx='120' cy='14.2' fill='url(%23s-j)' rx='93.1' ry='93.7' transform='matrix(.58 0 0 .58 192 250)' /%3E%3Cg transform='matrix(.58 0 0 .57 197 182)'%3E%3Cpath fill='%23cac7c8' d='M46 192h1l72-48-7-9-66 57Z' /%3E%3Cpath fill='%23fbfffc' d='M46 191v1l66-57-7-9-59 65Z' /%3E%3Cpath fill='url(%23s-d)' d='m119 144-7-9 66-57-59 66Z' /%3E%3Cpath fill='%23fb645c' d='m105 126 7 9 66-57-1-1-72 49Z' /%3E%3C/g%3E%3Cpath stroke='%23fff' stroke-linecap='round' stroke-miterlimit='1' stroke-width='1.3' d='m287 278 3-2m-12-17 8-2m-8-3h4m-4-13 8 2m-8 3h4m-1-13 7 3m-4-11 7 4m-2-11 6 6m0-12 6 7m1-11 4 6m4-10 3 7m5-9 2 7m15-7-1 7m10-5-3 7m11-4-4 7m11-2-5 6m16 7-7 4m10 4-7 3m10 6-8 1m8 16-8-2m5 10-7-3m4 11-7-4m2 11-6-5m0 11-5-6m-2 11-4-7m-4 11-3-8m-6 10-1-8m-16 8 2-8m-10 5 3-7m-11 4 4-7m-11 2 5-6m-8 3 3-3m4 8 2-3m5 8 2-4m6 7 1-4m8 5v-4m8 4v-4m9 3-1-4m9 1-2-4m9 0-2-4m9-2-3-3m8-4-3-2m8-5-4-2m7-6-4-1m5-8h-4m4-8h-4m3-9-4 1m1-9-4 2m-1-9-3 2m-2-9-3 3m-4-8-2 3m-5-8-2 4m-6-6-1 3m-8-5v4m-8-4v4m-9-2 1 3m-9 0 2 3m-9 1 2 3m-9 2 3 3m-8 4 3 2m-8 5 4 2m-7 6 4 1m-4 25 4-1m-2 5 7-3m-6 7 4-2m-2 6 7-4m-13-21h8m41-41v-8m0 99v-8m49-42h-8' transform='translate(-65 8)' /%3E%3C/svg%3E)

[Source](https://developer.mozilla.org/docs/Web/API/StorageManager/getDirectory)

  
 

### Accessing files optimized for performance from the origin private file system

The origin private file system provides optional access to a special kind of file that is highly  
optimized for performance, for example, by offering in-place and exclusive write access to a file's  
content. In Chromium 102 and later, there is an additional method on the origin private file system for  
simplifying file access: `createSyncAccessHandle()` (for synchronous read and write operations).  
It is exposed on `FileSystemFileHandle`, but exclusively in  
[Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers).

```
// (Read and write operations are synchronous,
// but obtaining the handle is asynchronous.)
// Synchronous access exclusively in Worker contexts.
const accessHandle = await fileHandle.createSyncAccessHandle();
const writtenBytes = accessHandle.write(buffer);
const readBytes = accessHandle.read(buffer, { at: 1 });
```

> \[!NOTE\]  
> **Note:** People interested in the `createAccessHandle()` method (that is, the async variant available on the main thread and in Web Workers) should track [crbug.com/1323922](https://bugs.chromium.org/p/chromium/issues/detail?id=1323922).

## Polyfilling

It is not possible to completely polyfill the File System Access API methods.

*   The `showOpenFilePicker()` method can be approximated with an `<input type="file">` element.
*   The `showSaveFilePicker()` method can be simulated with a `<a download="file_name">` element, albeit this triggers a programmatic download and not allow for overwriting existing files.
*   The `showDirectoryPicker()` method can be somewhat emulated with the non-standard `<input type="file" webkitdirectory>` element.

We have developed a library called [browser-fs-access](https://developer.chrome.com/articles/browser-fs-access) that uses the File  
System Access API wherever possible and that falls back to these next best options in all other  
cases.

## Security and permissions

The Chrome team has designed and implemented the File System Access API using the core principles  
defined in [Controlling Access to Powerful Web Platform Features](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/security/permissions-for-powerful-web-platform-features.md), including user  
control and transparency, and user ergonomics.

### Opening a file or saving a new file

![File picker to open a file for reading](https://developer.chrome.com/static/docs/capabilities/web-apis/file-system-access/image/file-picker-open-file-8cb5f6783ee89.jpg) A file picker used to open an existing file for reading.

When opening a file, the user provides permission to read a file or directory using the file picker.  
The open file picker can only be shown using a user gesture when served from a [secure](https://w3c.github.io/webappsec-secure-contexts/)  
[context](https://w3c.github.io/webappsec-secure-contexts/). If users change their minds, they can cancel the selection in the file  
picker and the site does not get access to anything. This is the same behavior as that of the  
`<input type="file">` element.  
![File picker to save a file to disk.](https://developer.chrome.com/static/docs/capabilities/web-apis/file-system-access/image/file-picker-save-file-bd54ae001799a.jpg) A file picker used to save a file to disk.

Similarly, when a web app wants to save a new file, the browser shows the save file picker,  
allowing the user to specify the name and location of the new file. Since they are saving a new file  
to the device (versus overwriting an existing file), the file picker grants the app permission to  
write to the file.

#### Restricted folders

To help protect users and their data, the browser may limit the user's ability to save to certain  
folders, for example, core operating system folders like Windows, the macOS Library folders.  
When this happens, the browser shows a prompt and ask the user to choose a different  
folder.

### Modifying an existing file or directory

A web app cannot modify a file on disk without getting explicit permission from the user.

#### Permission prompt

If a person wants to save changes to a file that they previously granted read access to, the browser  
shows a permission prompt, requesting permission for the site to write changes to disk.  
The permission request can only be triggered by a user gesture, for example, by clicking a Save  
button.  
![Permission prompt shown prior to saving a file.](https://developer.chrome.com/static/docs/capabilities/web-apis/file-system-access/image/permission-prompt-shown-p-823d180f97ad5.png) Prompt shown to users before the browser is granted write permission on an existing file.

Alternatively, a web app that edits multiple files, such as an IDE, can also ask for permission to save  
changes at the time of opening.

If the user chooses Cancel, and does not grant write access, the web app cannot save changes to the  
local file. It should provide an alternative method for the user to save their data, for  
example by providing a way to ["download" the file](https://web.dev/downloading-resources-in-html5-a-download/) or saving data to the cloud.

### Transparency

![Omnibox icon](https://developer.chrome.com/static/docs/capabilities/web-apis/file-system-access/image/omnibox-icon-5797e9a831603.jpg) Address bar icon indicating the user has granted the website permission to save to a local file.

Once a user has granted permission to a web app to save a local file, the browser shows an icon  
in the address bar. Clicking on the icon opens a pop-over showing the list of files the user has given  
access to. The user can always revoke that access if they choose.

### Permission persistence

The web app can continue to save changes to the file without prompting until all tabs for its  
origin are closed. Once a tab is closed, the site loses all access. The next time the user uses the  
web app, they will be re-prompted for access to the files.

## Feedback

We want to hear about your experiences with the File System Access API.

### Tell us about the API design

Is there something about the API that doesn't work like you expected? Or are there missing methods  
or properties that you need to implement your idea? Have a question or comment on the security  
model?

*   File a spec issue on the [WICG File System Access GitHub repo](https://github.com/wicg/file-system-access/issues/), or add your thoughts to an existing issue.

### Problem with the implementation?

Did you find a bug with Chrome's implementation? Or is the implementation different from the spec?

*   File a bug at [https://new.crbug.com](https://issues.chromium.org/issues/new?noWizard=true&template=0&component=1456307). Be sure to include as much detail as you can, instructions for reproducing, and set _Components_ to `Blink>Storage>FileSystem`.

### Planning to use the API?

Planning to use the File System Access API on your site? Your public support helps us to prioritize  
features, and shows other browser vendors how critical it is to support them.

*   Share how you plan to use it on the [WICG Discourse thread](https://discourse.wicg.io/t/writable-file-api/1433).
*   Send a tweet to [@ChromiumDev](https://twitter.com/chromiumdev) using the hashtag [`#FileSystemAccess`](https://twitter.com/search?q=%23FileSystemAccess&src=typed_query&f=live) and let us know where and how you're using it.

## Helpful links

*   [Public explainer](https://github.com/WICG/file-system-access/blob/main/EXPLAINER.md)
*   [File System Access specification](https://wicg.github.io/file-system-access/) & [File specification](https://w3c.github.io/FileAPI/)
*   [Tracking bug](https://crbug.com/853326)
*   [ChromeStatus.com entry](https://www.chromestatus.com/feature/6284708426022912)
*   [TypeScript definitions](https://www.npmjs.com/package/@types/wicg-file-system-access)
*   [File System Access API - Chromium Security Model](https://docs.google.com/document/d/1NJFd-EWdUlQ7wVzjqcgXewqC5nzv_qII4OvlDtK6SE8/edit)
*   Blink Component: `Blink>Storage>FileSystem`

## Acknowledgements

The File System Access API spec was written by  
[Marijn Kruisselbrink](https://github.com/mkruisselbrink).