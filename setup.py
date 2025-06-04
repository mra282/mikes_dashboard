"""Setup for Mike's Dashboard."""
from setuptools import setup, find_packages

setup(
    name="mikes_dashboard",
    version="0.1.0",
    description="Auto-generating dashboard for Home Assistant",
    url="https://github.com/mra282/mikes_dashboard",
    author="Mike",
    author_email="your.email@example.com",
    license="MIT",
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
)
