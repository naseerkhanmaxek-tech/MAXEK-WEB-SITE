"""
MAXEK India Corporate Website — Backend API Test Suite
=======================================================
Comprehensive test coverage for all backend endpoints.
"""
import requests
import sys
from datetime import datetime

BASE_URL = "https://objective-golick-6.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

class BackendTester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.failed_tests = []

    def log_test(self, name, passed, details=""):
        """Log test result"""
        self.tests_run += 1
        if passed:
            self.tests_passed += 1
            print(f"{Colors.GREEN}✓{Colors.END} {name}")
        else:
            self.tests_failed += 1
            self.failed_tests.append({"name": name, "details": details})
            print(f"{Colors.RED}✗{Colors.END} {name}")
            if details:
                print(f"  {Colors.YELLOW}→{Colors.END} {details}")

    def test_health(self):
        """Test GET /api/health"""
        print(f"\n{Colors.BLUE}=== Testing Health Endpoint ==={Colors.END}")
        try:
            response = requests.get(f"{BASE_URL}/health", timeout=10)
            data = response.json()
            
            passed = (
                response.status_code == 200 and
                data.get("status") == "healthy" and
                data.get("database") == "connected"
            )
            self.log_test(
                "GET /api/health returns healthy + database connected",
                passed,
                f"Status: {response.status_code}, Response: {data}" if not passed else ""
            )
            return passed
        except Exception as e:
            self.log_test("GET /api/health", False, str(e))
            return False

    def test_enquiry_valid(self):
        """Test POST /api/enquiry with valid payload"""
        print(f"\n{Colors.BLUE}=== Testing Enquiry Endpoint ==={Colors.END}")
        try:
            payload = {
                "full_name": f"Test User {datetime.now().strftime('%H%M%S')}",
                "email": "test@example.com",
                "phone": "+91 9876543210",
                "company_name": "Test Company",
                "business_vertical": "maxek-infra",
                "service_required": "Industrial Construction",
                "project_details": "Test project details"
            }
            response = requests.post(f"{BASE_URL}/enquiry", json=payload, timeout=10)
            data = response.json()
            
            expected_message = "Thank you! Your enquiry has been submitted successfully. Our team will contact you shortly."
            
            passed = (
                response.status_code == 201 and
                data.get("success") is True and
                "id" in data and
                data.get("message") == expected_message
            )
            
            self.log_test(
                "POST /api/enquiry with valid payload -> 201, success true, id, exact success message",
                passed,
                f"Status: {response.status_code}, Response: {data}" if not passed else ""
            )
            
            # Verify persistence
            if passed:
                enquiry_id = data.get("id")
                verify_response = requests.get(f"{BASE_URL}/enquiries", timeout=10)
                verify_data = verify_response.json()
                items = verify_data.get("items", [])
                found = any(item.get("id") == enquiry_id for item in items)
                self.log_test(
                    "Enquiry persisted and retrievable via GET /api/enquiries",
                    found,
                    f"Enquiry ID {enquiry_id} not found in enquiries list" if not found else ""
                )
            
            return passed
        except Exception as e:
            self.log_test("POST /api/enquiry valid", False, str(e))
            return False

    def test_enquiry_validation(self):
        """Test POST /api/enquiry with missing/invalid fields"""
        # Test missing required fields
        try:
            payload = {"company_name": "Test"}  # Missing full_name, email, phone
            response = requests.post(f"{BASE_URL}/enquiry", json=payload, timeout=10)
            
            passed = response.status_code == 422
            self.log_test(
                "POST /api/enquiry with missing required fields -> 422",
                passed,
                f"Expected 422, got {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("POST /api/enquiry missing fields", False, str(e))

        # Test invalid email
        try:
            payload = {
                "full_name": "Test User",
                "email": "invalid-email",
                "phone": "+91 9876543210"
            }
            response = requests.post(f"{BASE_URL}/enquiry", json=payload, timeout=10)
            
            passed = response.status_code == 422
            self.log_test(
                "POST /api/enquiry with invalid email -> 422",
                passed,
                f"Expected 422, got {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("POST /api/enquiry invalid email", False, str(e))

    def test_contact(self):
        """Test POST /api/contact"""
        print(f"\n{Colors.BLUE}=== Testing Contact Endpoint ==={Colors.END}")
        try:
            payload = {
                "full_name": f"Contact Test {datetime.now().strftime('%H%M%S')}",
                "email": "contact@example.com",
                "phone": "+91 9876543210",
                "project_details": "Contact form test"
            }
            response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
            data = response.json()
            
            passed = response.status_code == 201 and data.get("success") is True
            self.log_test(
                "POST /api/contact valid payload -> 201",
                passed,
                f"Status: {response.status_code}, Response: {data}" if not passed else ""
            )
            
            # Verify it's persisted with kind 'contact'
            if passed:
                contact_id = data.get("id")
                verify_response = requests.get(f"{BASE_URL}/enquiries", timeout=10)
                verify_data = verify_response.json()
                items = verify_data.get("items", [])
                found_item = next((item for item in items if item.get("id") == contact_id), None)
                kind_correct = found_item and found_item.get("kind") == "contact"
                self.log_test(
                    "Contact persisted with kind 'contact'",
                    kind_correct,
                    f"Contact not found or kind incorrect: {found_item}" if not kind_correct else ""
                )
            
            return passed
        except Exception as e:
            self.log_test("POST /api/contact", False, str(e))
            return False

    def test_projects(self):
        """Test project endpoints"""
        print(f"\n{Colors.BLUE}=== Testing Projects Endpoints ==={Colors.END}")
        
        # Test GET /api/projects
        try:
            response = requests.get(f"{BASE_URL}/projects", timeout=10)
            data = response.json()
            
            passed = response.status_code == 200 and len(data) == 12
            self.log_test(
                "GET /api/projects returns 12 projects",
                passed,
                f"Expected 12 projects, got {len(data)}" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/projects", False, str(e))

        # Test vertical filter
        try:
            response = requests.get(f"{BASE_URL}/projects?vertical=maxek-infra", timeout=10)
            data = response.json()
            
            all_infra = all(p.get("vertical_slug") == "maxek-infra" for p in data)
            passed = response.status_code == 200 and all_infra and len(data) > 0
            self.log_test(
                "GET /api/projects?vertical=maxek-infra returns only maxek-infra projects",
                passed,
                f"Filter not working correctly, got {len(data)} projects" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/projects?vertical=maxek-infra", False, str(e))

        # Test project detail
        try:
            response = requests.get(f"{BASE_URL}/projects/integrated-manufacturing-plant-kerala", timeout=10)
            data = response.json()
            
            passed = response.status_code == 200 and data.get("slug") == "integrated-manufacturing-plant-kerala"
            self.log_test(
                "GET /api/projects/{slug} returns full detail",
                passed,
                f"Status: {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/projects/{slug}", False, str(e))

        # Test unknown slug
        try:
            response = requests.get(f"{BASE_URL}/projects/unknown-project-slug", timeout=10)
            
            passed = response.status_code == 404
            self.log_test(
                "GET /api/projects/unknown-slug -> 404",
                passed,
                f"Expected 404, got {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/projects unknown slug", False, str(e))

    def test_articles(self):
        """Test articles endpoints"""
        print(f"\n{Colors.BLUE}=== Testing Articles Endpoints ==={Colors.END}")
        
        # Test GET /api/articles
        try:
            response = requests.get(f"{BASE_URL}/articles", timeout=10)
            data = response.json()
            
            passed = response.status_code == 200 and len(data) == 8
            self.log_test(
                "GET /api/articles returns 8 articles",
                passed,
                f"Expected 8 articles, got {len(data)}" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/articles", False, str(e))

        # Test category filter
        try:
            response = requests.get(f"{BASE_URL}/articles?category=Articles", timeout=10)
            data = response.json()
            
            all_articles = all(a.get("category") == "Articles" for a in data)
            passed = response.status_code == 200 and all_articles and len(data) > 0
            self.log_test(
                "GET /api/articles?category=Articles filters correctly",
                passed,
                f"Filter not working, got {len(data)} articles" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/articles?category=Articles", False, str(e))

        # Test article detail
        try:
            response = requests.get(f"{BASE_URL}/articles/industrial-construction-programme-certainty", timeout=10)
            data = response.json()
            
            passed = response.status_code == 200 and data.get("slug") == "industrial-construction-programme-certainty"
            self.log_test(
                "GET /api/articles/{slug} works",
                passed,
                f"Status: {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/articles/{slug}", False, str(e))

        # Test unknown slug
        try:
            response = requests.get(f"{BASE_URL}/articles/unknown-article-slug", timeout=10)
            
            passed = response.status_code == 404
            self.log_test(
                "GET /api/articles/unknown-slug -> 404",
                passed,
                f"Expected 404, got {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/articles unknown slug", False, str(e))

    def test_jobs(self):
        """Test jobs endpoints"""
        print(f"\n{Colors.BLUE}=== Testing Jobs Endpoints ==={Colors.END}")
        
        # Test GET /api/jobs
        try:
            response = requests.get(f"{BASE_URL}/jobs", timeout=10)
            data = response.json()
            
            openings = [j for j in data if not j.get("is_internship")]
            internships = [j for j in data if j.get("is_internship")]
            
            passed = response.status_code == 200 and len(data) == 8 and len(openings) == 6 and len(internships) == 2
            self.log_test(
                "GET /api/jobs returns 8 jobs (6 openings + 2 internships)",
                passed,
                f"Expected 8 jobs (6+2), got {len(data)} ({len(openings)}+{len(internships)})" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/jobs", False, str(e))

        # Test job detail
        try:
            response = requests.get(f"{BASE_URL}/jobs/infra-project-manager", timeout=10)
            data = response.json()
            
            passed = response.status_code == 200 and data.get("id") == "infra-project-manager"
            self.log_test(
                "GET /api/jobs/{id} works",
                passed,
                f"Status: {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/jobs/{id}", False, str(e))

        # Test unknown id
        try:
            response = requests.get(f"{BASE_URL}/jobs/unknown-job-id", timeout=10)
            
            passed = response.status_code == 404
            self.log_test(
                "GET /api/jobs/unknown-id -> 404",
                passed,
                f"Expected 404, got {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("GET /api/jobs unknown id", False, str(e))

    def test_careers_apply(self):
        """Test career application endpoint"""
        print(f"\n{Colors.BLUE}=== Testing Careers Apply Endpoint ==={Colors.END}")
        
        # Test valid application
        try:
            payload = {
                "job_id": "infra-project-manager",
                "full_name": f"Applicant {datetime.now().strftime('%H%M%S')}",
                "email": "applicant@example.com",
                "phone": "+91 9876543210",
                "experience_years": "5",
                "current_location": "Thiruvananthapuram",
                "cover_note": "Test application"
            }
            response = requests.post(f"{BASE_URL}/careers/apply", json=payload, timeout=10)
            data = response.json()
            
            passed = response.status_code == 201 and data.get("success") is True
            self.log_test(
                "POST /api/careers/apply with valid payload and real job_id -> 201",
                passed,
                f"Status: {response.status_code}, Response: {data}" if not passed else ""
            )
            
            # Verify persistence
            if passed:
                app_id = data.get("id")
                verify_response = requests.get(f"{BASE_URL}/careers/applications", timeout=10)
                verify_data = verify_response.json()
                items = verify_data.get("items", [])
                found = any(item.get("id") == app_id for item in items)
                self.log_test(
                    "Application persisted (verify GET /api/careers/applications)",
                    found,
                    f"Application ID {app_id} not found" if not found else ""
                )
        except Exception as e:
            self.log_test("POST /api/careers/apply valid", False, str(e))

        # Test invalid job_id
        try:
            payload = {
                "job_id": "non-existent-job",
                "full_name": "Test User",
                "email": "test@example.com",
                "phone": "+91 9876543210"
            }
            response = requests.post(f"{BASE_URL}/careers/apply", json=payload, timeout=10)
            
            passed = response.status_code == 404
            self.log_test(
                "POST /api/careers/apply with invalid job_id -> 404",
                passed,
                f"Expected 404, got {response.status_code}" if not passed else ""
            )
        except Exception as e:
            self.log_test("POST /api/careers/apply invalid job_id", False, str(e))

    def print_summary(self):
        """Print test summary"""
        print(f"\n{Colors.BLUE}{'='*60}{Colors.END}")
        print(f"{Colors.BLUE}TEST SUMMARY{Colors.END}")
        print(f"{Colors.BLUE}{'='*60}{Colors.END}")
        print(f"Total Tests: {self.tests_run}")
        print(f"{Colors.GREEN}Passed: {self.tests_passed}{Colors.END}")
        print(f"{Colors.RED}Failed: {self.tests_failed}{Colors.END}")
        
        if self.failed_tests:
            print(f"\n{Colors.RED}Failed Tests:{Colors.END}")
            for test in self.failed_tests:
                print(f"  • {test['name']}")
                if test['details']:
                    print(f"    {test['details']}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"\n{Colors.BLUE}Success Rate: {success_rate:.1f}%{Colors.END}")
        
        return 0 if self.tests_failed == 0 else 1

def main():
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}MAXEK India Corporate Website — Backend API Tests{Colors.END}")
    print(f"{Colors.BLUE}{'='*60}{Colors.END}")
    print(f"Base URL: {BASE_URL}\n")
    
    tester = BackendTester()
    
    # Run all tests
    tester.test_health()
    tester.test_enquiry_valid()
    tester.test_enquiry_validation()
    tester.test_contact()
    tester.test_projects()
    tester.test_articles()
    tester.test_jobs()
    tester.test_careers_apply()
    
    return tester.print_summary()

if __name__ == "__main__":
    sys.exit(main())
