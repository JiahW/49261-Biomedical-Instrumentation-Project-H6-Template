# 49261-Biomedical-Instrumentation-Project-H6-Template
UTS Subject 49261 Biomedical Instrumentation Project H6 Template

### Set up your development environment ###

For Mac

**1. Install Xcode via App Store**

Xcode is free but the App Store requires your Apple id to download it.

**2. Install brew**

Open the Terminal via Applications/Utilities/Terminal or click on top right corner spot light to search the word Terminal. After you saw the command prompt, copy and paste the following line of command into the Terminal.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Type Enter and wait until brew has been successfully installed. The duration of this process depends on your Internet speed.

**3. Install python to /usr/local**

In Terminal, copy and paste following line of command.

```
brew install python
```

Type Enter and wait until python has been successfully installed into /usr/local. The duration of this process depends on your Internet speed.

**4. Install virtualenv with newly installed python**

In Terminal, copy and paste following line of command if you installed python3 from step 3.

```
pip3 install virtualenv
```

If you got python2, use the following command

```
pip install virtualenv
```

**5. Setup workspace and install Node.js**

Once virtualenv has been installed, copy and paste following command into Terminal to setup your workspace.

```
mkdir ~/workspace
cd ~/workspace
virtualenv --clear pyenv
```

After the above three lines of command finished, proceed to install Node.js with the followings in Terminal.

```
source pyenv/bin/activate
pip install nodeenv
nodeenv nodeenv
```

Once everything is done, you can proceed to the next step.

**6. Activate Node.js environment**

You will repeat this step every time you open a new Terminal session. Use the following lines of command to get you back into the Node.js environment.

```
cd ~/workspace
source nodeenv/bin/activate
```

Once you have done the above commands, you should see (nodeenv) as the prefix of your command prompt.

**7. Download or clone this repository and sail to the new frontier**

Click Download on the repository GitHub page to download it. Once you have downloaded it, decompress the .zip or .tar.gz file and move ProjectH6 folder under the workspace. Repeat step 6 to activate Node.js environment in prompt if you have not. Then type following line of command to resolve the dependancies.

```
cd ~/workspace
cd ProjectH6
npm install -g react-native-cli
npm install
```

Once you have done the above, type the following to run the template.

```
react-native run-ios
```

If you have any question please create a new issue in this repository or [email me](mailto:xu.lian@uts.edu.au) and I will reply as soon as possible.

Happy Coding :heart:
