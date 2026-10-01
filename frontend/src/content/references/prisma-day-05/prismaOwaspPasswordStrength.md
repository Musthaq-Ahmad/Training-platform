# Implement Proper Password Strength Controls

A key concern when using passwords for authentication is password strength. A "strong" password policy makes it difficult or even improbable for one to guess the password through either manual or automated means. The following characteristics define a strong password:

- Password Length
  - **Minimum** length for passwords should be enforced by the application.
    - If MFA is enabled passwords **shorter than 8 characters** are considered to be weak ([NIST SP800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver)).
    - If MFA is not enabled passwords **shorter than 15 characters** are considered to be weak ([NIST SP800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver)).
  - **Maximum** password length should be **at least 64 characters** to allow passphrases ([NIST SP800-63B](https://pages.nist.gov/800-63-4/sp800-63b.html#passwordlength)). Note that certain implementations of hashing algorithms may cause [long password denial of service](https://www.acunetix.com/vulnerabilities/web/long-password-denial-of-service/).
  - Longer passphrases are effective because they raise the number of guesses an attacker's dictionary or wordlist has to cover, not because of a precise entropy value: NIST notes that "estimating entropy for user-chosen passwords is challenging" and recommends length and blocklist checks (see below) over composition or entropy math ([NIST SP800-63B, Strength of Passwords](https://pages.nist.gov/800-63-4/sp800-63b/passwords/#appA)). Entropy estimates rely on assumptions about the search space and should be treated as illustrative rather than as absolute measures of password strength.
  - Attackers commonly use password guessing techniques that leverage common-password dictionaries and password lists, and may use previously compromised credentials in credential stuffing attacks. These behaviors are reflected in [MITRE ATT&CK T1110 – Brute Force](https://attack.mitre.org/techniques/T1110/), including Password Guessing, Password Spraying, and Credential Stuffing. Screening passwords against blocklists helps prevent users from selecting passwords that are commonly used or already known to attackers, as recommended by [NIST SP 800-63B – Passwords](https://pages.nist.gov/800-63-4/sp800-63b/passwords/).
- Do not silently truncate passwords. The [Password Storage Cheat Sheet](Password_Storage_Cheat_Sheet.html#maximum-password-lengths) provides further guidance on how to handle passwords that are longer than the maximum length.
- Allow usage of **all** characters including unicode and whitespace. There should be no password composition rules limiting the type of characters permitted. There should be no requirement for upper or lower case or numbers or special characters.
- Ensure credential rotation when a password leak occurs, at the time of compromise identification or when authenticator technology changes. Avoid requiring periodic password changes; instead, encourage users to pick strong passwords and enable [Multifactor Authentication Cheat Sheet (MFA)](Multifactor_Authentication_Cheat_Sheet.html). According to NIST guidelines, verifiers should not mandate arbitrary password changes (e.g., periodically).
- Include a password strength meter to help users create a more complex password
  - [zxcvbn-ts library](https://github.com/zxcvbn-ts/zxcvbn) can be used for this purpose.
  - Other language implementations of zxcvbn [listed here](https://github.com/dropbox/zxcvbn?tab=readme-ov-file); however check the age and maturity of each example before use.
- Block common and previously breached passwords
  - [Pwned Passwords](https://haveibeenpwned.com/Passwords) is a service where passwords can be checked against previously breached passwords. Details on the API [are here](https://haveibeenpwned.com/API/v3#PwnedPasswords).
  - Alternatively, you can download the [Pwned Passwords](https://haveibeenpwned.com/Passwords) database [using this mechanism](https://github.com/HaveIBeenPwned/PwnedPasswordsDownloader?tab=readme-ov-file#what-is-haveibeenpwned-downloader) to host it yourself.
  - Other top password lists are available but there is no guarantee as to how updated they are:
    - [Various password lists](https://github.com/danielmiessler/SecLists/tree/master/Passwords) hosted by SecLists from Daniel Miessler.

#### For more detailed information check

- [ASVS v5.0 Password Security Requirements](https://github.com/OWASP/ASVS/blob/master/5.0/en/0x15-V6-Authentication.md#v62-password-security)
- [Passwords Evolved: Authentication Guidance for the Modern Era](https://www.troyhunt.com/passwords-evolved-authentication-guidance-for-the-modern-era/)
