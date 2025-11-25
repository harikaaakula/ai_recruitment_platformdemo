"""
Database Backup Script
Creates a backup of the current database before regenerating data
"""

import sqlite3
import shutil
from datetime import datetime
import os

def backup_database():
    """Create a timestamped backup of the database"""
    
    # Database paths
    db_path = 'backend/database/recruitment.db'
    backup_dir = 'backend/database/backups'
    
    # Create backups directory if it doesn't exist
    os.makedirs(backup_dir, exist_ok=True)
    
    # Generate backup filename with timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = f'{backup_dir}/recruitment_backup_{timestamp}.db'
    
    try:
        # Copy database file
        shutil.copy2(db_path, backup_path)
        print(f"✅ Database backed up successfully!")
        print(f"📁 Backup location: {backup_path}")
        
        # Get database size
        size_mb = os.path.getsize(backup_path) / (1024 * 1024)
        print(f"📊 Backup size: {size_mb:.2f} MB")
        
        return backup_path
        
    except FileNotFoundError:
        print(f"⚠️  Database file not found at: {db_path}")
        print("   This might be the first run. Continuing without backup...")
        return None
        
    except Exception as e:
        print(f"❌ Error creating backup: {e}")
        return None

if __name__ == "__main__":
    print("🔄 Creating database backup...\n")
    backup_path = backup_database()
    
    if backup_path:
        print(f"\n✅ Backup complete! You can restore from: {backup_path}")
    else:
        print("\n⚠️  No backup created (database might not exist yet)")
